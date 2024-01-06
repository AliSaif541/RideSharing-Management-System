import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Login from './components/login';
import Signup_C from './components/Signup_C';
import Signup_D from './components/Signup_D';
import Signup_A from './components/Signup_A';
import Home from './pages/home';
import Driver from './pages/Driver';
import Customer from './pages/Customer';
import Company from './pages/Company';


function App() {
  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    user = jwtDecode(token);
  }

  if (user) {
    console.log(user);
  }
  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        {user && user.role === "Customer" && <Route path="/customer" element={<Customer />} />}
        {user && user.role === "Driver" && <Route path="/driver" element={<Driver />} />}
        {user && user.role ==="Admin" && <Route path="/admin" element={<Company />} />}
        <Route path="/customer_signin" element={<Signup_C />} />
        <Route path="/driver_signin" element={<Signup_D />} />
        <Route path="/admin_signin" element={<Signup_A />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/driver" element={<Navigate replace to="/" />} />
        <Route path="/customer" element={<Navigate replace to="/" />} />
        <Route path="/admin" element={<Navigate replace to="/" />} />
		  </Routes>
    </BrowserRouter>
  );
}

export default App;
