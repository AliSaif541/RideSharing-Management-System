import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = (prop) => {
    const [data, setData] = useState({ 
        email: "", 
        password: "",
        role: "", 
    });
	const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:9000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			
            const rolePath = `/${data.role.toLowerCase()}`;
            console.log(rolePath);
            window.location = rolePath;
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	}

    return (
        <div>
            <h1><span>Ridesharing</span> Management System</h1>
            <div className="custom-login-page">
                <h2>Login</h2>
                <form className='custom-form' onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <input className="custom-user-inp" type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} required />
                        <input className="custom-user-inp" type='password' placeholder='Password' name='password' value={data.password} onChange={handleChange} required />
                        <input className="custom-user-inp" type='text' placeholder='Role' name='role' value={data.role} onChange={handleChange} required />
                        {error && <div className="custom-error">{error}</div>}
                    </div>
                    <button className="custom-sub-button" type="submit">Login</button>
                </form>
                <div className="custom-question">
                    <p>Don't have an account?</p>
                    <div><Link className='custom-signup' to="/customer_signin">Join us as Customer</Link></div>
                    <div><Link className='custom-signup' to="/driver_signin">Join us as a Rider</Link></div>
                    <div><Link className='custom-signup' to="/admin_signin">Join us as an Admin</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
