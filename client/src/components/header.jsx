import '../styles/header.css'
import { Link } from "react-router-dom";

const Header = (prop)=>{
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    return (       
        <div className="header">
            <div className="About">
                <img src='./images/Logo.jpg' alt='Logo'></img>
                <div className='Title'><span className='Careem'>RideSharing</span> Management System</div>
            </div>
            <div className='Navbar'>
                <div className='Logout' onClick={handleLogout}>Logout</div>
            </div>
        </div> 
    )
}

export default Header