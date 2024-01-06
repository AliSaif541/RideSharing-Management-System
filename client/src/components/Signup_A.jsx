import '../styles/signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = (prop) => {
    const [data, setData] = useState({
		first_name: "",
        last_name: "",
        contact_number: "",
		role: "Admin",
		email: "",
		password: "",
        key: "",
	});
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:9000/api/admin";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};

    return (        
        <div className="signup-page">
            <h1><span>Ridesharing</span> Management System</h1>
            <div className='signup-container'>
                <div className="signup-header"> <span class="lib-name">Admin </span>Sign-up</div>
                <form className='form' onSubmit={handleSubmit} >
                    <div className='input-container'>
                        <input className="user-inp" type='text' placeholder='First Name' name='first_name' value={data.name} onChange={handleChange} required />
                        <input className="user-inp" type='text' placeholder='Last Name' name='last_name' value={data.name} onChange={handleChange} required />
                        <input className="user-inp" type='text' placeholder='Contact Number' name='contact_number' value={data.name} onChange={handleChange} required />
                        <input className="user-inp" type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} required />
                        <input className="user-inp" type='password' placeholder='Password' name='password' value={data.password} onChange={handleChange} required />
                        <input className="user-inp" type='key' placeholder='Key' name='key' value={data.key} onChange={handleChange} required />
                    </div>
                    {error && <div className="Error">{error}</div>}
                    <button className="submit-button" type='submit' >Sign Up</button>
                </form>
            </div>
        </div>
    )

}

export default SignUp