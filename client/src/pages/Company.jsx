import React, { useState } from 'react';
import Header from '../components/header';
import axios from 'axios';
import '../styles/company.css';

const Company = (prop) => {
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [authorizedCustomer, setAuthorizedCustomer] = useState("");
  const [customerError, setCustomerError] = useState("");
  const [checkAuthCustomers, setCheckAuthCustomers] = useState("");
  const [checkRemoveCustomers, setCheckRemoveCustomers] = useState("");
  const [authorizedDriver, setAuthorizedDriver] = useState("");
  const [driverError, setDriverError] = useState("");
  const [checkAuthDrivers, setCheckAuthDrivers] = useState("");
  const [checkRemoveDrivers, setCheckRemoveDrivers] = useState("");

  const auth_customers = async () => {
    setCheckAuthCustomers("Set");
    setShowCustomers(false);
    setShowDrivers(false);
    setCheckAuthDrivers("");
    setDriverError("");
    setCustomerError("");
    setCheckRemoveCustomers("");
    setCheckRemoveDrivers("");
  };

  const auth_drivers = async () => {
    setCheckAuthDrivers("Set");
    setShowCustomers(false);
    setShowDrivers(false);
    setCheckAuthCustomers("");
    setDriverError("");
    setCustomerError("");
    setCheckRemoveCustomers("");
    setCheckRemoveDrivers("");
  };

  const handleDriverAuthorization = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/admin/auth/driver";
      const { data: res } = await axios.post(url,{
        email: authorizedDriver,
      });

      setDriverError("Authorized Successfully");
    } catch (err) {
      setDriverError(err.message)
    }
  }

  const handleCustomerAuthorization = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/admin/auth/customer";
      const { data: res } = await axios.post(url,{
        email: authorizedCustomer,
      });

      setCustomerError("Authorized Successfully");
    } catch (err) {
      setCustomerError(err.message)
    }
  }

  const handleRemoveCustomer = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/admin/remove/customer";
      const { data: res } = await axios.post(url,{
        email: authorizedCustomer,
      });

      setCustomerError("Removed Successfully");
    } catch (err) {
      setCustomerError(err.message)
    }
  }

  const handleRemoveDriver = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/admin/remove/driver";
      const { data: res } = await axios.post(url,{
        email: authorizedDriver,
      });

      setDriverError("Removed Successfully");
    } catch (err) {
      setDriverError(err.message)
    }
  }

  const remove_customers = async () => {
    setCheckRemoveCustomers("Set");
    setCheckAuthCustomers("");
    setCustomerError("");
    setCheckRemoveDrivers("");
    setCheckAuthDrivers("");
    setDriverError("");
    setShowCustomers(false);
    setShowDrivers(false);
  };

  const remove_drivers = async () => {
    setCheckRemoveDrivers("Set");
    setCheckAuthDrivers("");
    setDriverError("");
    setCheckRemoveCustomers("");
    setCheckAuthCustomers("");
    setCustomerError("");
    setShowCustomers(false);
    setShowDrivers(false);
  };

  const print_customers = async () => {
    try {
      setDriverError("");
      setCustomerError("");
      setCheckAuthCustomers("");
      setCheckAuthDrivers("");
      setCheckRemoveCustomers("");
      setCheckRemoveDrivers("");
      const url = "http://localhost:9000/api/admin";
      const { data } = await axios.post(url, { action: "print_customers" });
      const customers = data.customers;
      console.log(customers);

      setCustomers(data.customers);
      setShowCustomers(true);
      setShowDrivers(false);
    } catch (error) {
      console.log(error);
    }
  };

  const print_drivers = async () => {
    try {
      setDriverError("");
      setCustomerError("");
      setCheckAuthDrivers("");
      setCheckAuthCustomers("");
      setCheckRemoveCustomers("");
      setCheckRemoveDrivers("");
      const url = "http://localhost:9000/api/admin";
      const { data } = await axios.post(url, { action: "print_drivers" });
      const drivers = data.drivers;
      console.log(drivers);

      setDrivers(data.drivers);
      setShowDrivers(true);
      setShowCustomers(false);


    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomerChange = (event) => {
    setAuthorizedCustomer(event.target.value);
  };

  const handleDriverChange = (event) => {
    console.log(event.target.value);
    setAuthorizedDriver(event.target.value);
  };

  return (
    <div>
      <Header />
      <h1><span>Admin</span> Dashboard</h1>
      <div className='Admin-container'>
        <button className="sub--button" onClick={auth_drivers}>
          Authorize a Driver
        </button>
        <button className="sub--button" onClick={auth_customers}>
          Authorize a Customer
        </button>
        <button className="sub--button" onClick={print_customers}>
          Print Customers
        </button>
        <button className="sub--button" onClick={print_drivers}>
          Print Drivers
        </button>
        <button className="sub--button" onClick={remove_customers}>
            Remove a Customer
        </button>   
        <button className="sub--button" onClick={remove_drivers}>
            Remove a Driver
        </button>
      </div>

      {checkAuthCustomers && (
        <div>
          <form className='authForm' onSubmit={handleCustomerAuthorization}>
            <div className='email-div'>Enter the email of the customer</div>
            <input className="email-inp" type="text" placeholder="Email" onChange={handleCustomerChange} />
            <button className='email-sub-button'>Enter</button>
            {customerError && <div className='auth-error'>{customerError}</div>}
          </form>
        </div>
      )}

      {checkAuthDrivers && (
        <div>
          <form className='authForm' onSubmit={handleDriverAuthorization}>
            <div className='email-div'>Enter the email of the driver</div>
            <input className="email-inp" type="text" placeholder="Email" onChange={handleDriverChange} />
            <button className='email-sub-button'>Enter</button>
            {driverError && <div className='auth-error'>{driverError}</div>}
          </form>
        </div>
      )}

      {checkRemoveCustomers && (
        <div>
          <form className='authForm' onSubmit={handleRemoveCustomer}>
            <div className='email-div'>Enter the email of the customer</div>
            <input className="email-inp" type="text" placeholder="Email" onChange={handleCustomerChange} />
            <button className='email-sub-button'>Enter</button>
            {customerError && <div className='auth-error'>{customerError}</div>}
          </form>
        </div>
      )}

      {checkRemoveDrivers && (
        <div>
          <form className='authForm' onSubmit={handleRemoveDriver}>
            <div className='email-div'>Enter the email of the driver</div>
            <input className="email-inp" type="text" placeholder="Email" onChange={handleDriverChange} />
            <button className='email-sub-button'>Enter</button>
            {driverError && <div className='auth-error'>{driverError}</div>}
          </form>
        </div>
      )}

      {showCustomers && (
        <div>
          <div className='C-Title'>Customers:</div>
          <ul>
          {customers.map((customer) => (
            <div key={customer._id}>
                <div className='C-Title'>Customer Details</div>
                <ul>
                <li>First Name: {customer.first_name}</li>
                <li>Last Name: {customer.last_name}</li>
                <li>Email: {customer.email}</li>
                <li>Password: {customer.password}</li>
                <li>Contact Number: {customer.contact_number}</li>
                <li>Role: {customer.role}</li>
                <li>Rating: {customer.rating}</li>
                <li>Is Verified: {customer.authorized ? 'Yes' : 'No'}</li>
                </ul>
            </div>
            ))}

          </ul>
        </div>
      )}

      {showDrivers && (
        <div>
          <div className='D-Title'>Drivers:</div>
          <ul>
          {drivers.map((driver) => (
            <div key={driver._id}>
                <div className='D-Title'>Driver Details</div>
                <ul>
                <li>First Name: {driver.first_name}</li>
                <li>Last Name: {driver.last_name}</li>
                <li>Email: {driver.email}</li>
                <li>Password: {driver.password}</li>
                <li>Contact Number: {driver.contact_number}</li>
                <li>Role: {driver.role}</li>
                <li>Rating: {driver.rating}</li>
                <li>Is Verified: {driver.authorized ? 'Yes' : 'No'}</li>
                </ul>
            </div>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Company;
