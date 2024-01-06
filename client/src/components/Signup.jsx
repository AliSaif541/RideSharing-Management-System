import '../styles/login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = (prop) => {
    const [data, setData] = useState({
		name: "",
		role: "",
		email: "",
		password: "",
	});
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:9000/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};

    return (        
        <div className="login-page">
            <div className="login-header"> Management <span class="lib-name">System</span></div>
            <form className='form' onSubmit={handleSubmit} >
                <div >
                    <input className="user-inp" type='text' placeholder='Name' name='name' value={data.name} onChange={handleChange} required />
                </div>
                <div >
                    <input className="user-inp" type='text' placeholder='Role' name='role' value={data.role} onChange={handleChange} required />
                </div>
                <div >
                    <input className="user-inp" type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} required />
                </div>
                <div>
                    <input className="user-inp" type='password' placeholder='Password' name='password' value={data.password} onChange={handleChange} required />
                </div>
               <div>
                    {error && <div className="Error">{error}</div>}
                    <button className="sub-button" type='submit' >Sign Up</button>
               </div>
            </form>
        </div>
    )

}

export default SignUp