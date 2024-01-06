import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import '../styles/customer.css'
import Header from '../components/header'

const Customer = () => {
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({
    first_name: "",
    last_name: "",
    rating: 0,
    contact_number: "", 
    vehicle_number: "",
    vehicle: "",
    number_of_rides: 0,
		role: "",
		email: "",
		password: "",
    available: "",
    authorized: true,
  });
  const [data, setData] = useState({ 
    startLocation: '', 
    endLocation: '', 
    price: 0, 
    distance: 0 ,
    customer: '',
    driver: '',
    vehicleNumber: '',
    isCompleted: '0',
  });
  const [error, setError] = useState("");
  const [ratError, setRatError] = useState("");
  const [rideError, setRideError] = useState("");
  const [flag, setFlag] = useState("");
  const [ratingVal, setRatingVal] = useState(0);
  const [customerRides, setCustomerRides] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      setData({ ...data, customer: user.email });
    }
  }, []);

  useEffect(() => {
  }, [driver]);

  useEffect(() => {
    if (data.customer) {
      fetchCustomerRides();
    }
  }, [data.customer]);
  
  
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
      if (data.startLocation === "" || data.endLocation === "" || data.price === "" || data.distance === "") {
        throw new Error("Please fill in all fields");
      }
			const url = "http://localhost:9000/api/rides";

      const response = await axios.get(url);

      const availableDrivers = response.data.filter(driver => driver.available === "True");

      const sortedDrivers = availableDrivers.sort((a, b) => (b.rating/b.number_of_rides) - (a.rating / a.number_of_rides));

      setDrivers(sortedDrivers);
      setError("");
      setFlag("True");
      fetchCustomerRides();

		} catch (error) {
		  setError(error.message);
		}
	};

  const handleDriverSelect = async (driverName, driverVehicleNumber) => {
    try {
      const selectedDriver = drivers.find(driver => 
        `${driver.first_name} ${driver.last_name}` === driverName && driver.vehicle_number === driverVehicleNumber);
  
      if (!selectedDriver) {
        throw new Error("Driver not found");
      }
      setDriver({
        first_name: selectedDriver.first_name,
        last_name: selectedDriver.last_name,
        role: selectedDriver.role,
        email: selectedDriver.email,
        password: selectedDriver.password,
        vehicle: selectedDriver.vehicle,
        contact_number: selectedDriver.contact_number,
        rating: selectedDriver.rating,
        number_of_rides: selectedDriver.number_of_rides,
        vehicle_number: selectedDriver.vehicle_number,
        available: "False",
        authorized: selectedDriver.authorized,
      });

      const url1 = "http://localhost:9000/api/rides/driver/flag";
      const { data: res1 } = await axios.post(url1,{
        first_name: selectedDriver.first_name,
        last_name: selectedDriver.last_name,
        role: selectedDriver.role,
        email: selectedDriver.email,
        password: selectedDriver.password,
        vehicle: selectedDriver.vehicle,
        contact_number: selectedDriver.contact_number,
        rating: selectedDriver.rating,
        number_of_rides: selectedDriver.number_of_rides,
        vehicle_number: selectedDriver.vehicle_number,
        available: "False",
        authorized: selectedDriver.authorized,
      });

      setData({ ...data, driver: driverName, vehicleNumber: driverVehicleNumber });

      const url = "http://localhost:9000/api/rides";
      const { data: res } = await axios.post(url,{
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        price: data.price,
        distance: data.distance,
        customer: data.customer,
        driver: driverName,
        vehicleNumber: driverVehicleNumber,
        isCompleted: data.isCompleted,
      });

      setRideError("Ride Started Successfully!");

    } catch (error) {
      setRideError(error.message);
    }
  };

  const handleRatings = async (e) => {
    try {
      e.preventDefault();

      let calNumRatings = driver.number_of_rides + 1; 

      let numericRatingVal = parseFloat(ratingVal);
    
      let calRating = (driver.rating + numericRatingVal);

      const url = `http://localhost:9000/api/ratings`;

      const { data: res } = await axios.post(url, {
        first_name: driver.first_name,
        last_name: driver.last_name,
        role: driver.role,
        email: driver.email,
        password: driver.password,
        vehicle: driver.vehicle,
        contact_number: driver.contact_number,
        rating: calRating,
        number_of_rides: calNumRatings,
        vehicle_number: driver.vehicle_number,
        available: "False",
        authorized: driver.authorized,
      });

      setRatError("Rating Added Successfully!")
    } catch(err) {
      setRatError(err.message)
    }
  };

  const fetchCustomerRides = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/rides/customer?email=${encodeURIComponent(data.customer)}`);

      setCustomerRides(response.data);
    } catch (error) {
      console.error("Error fetching customer rides: ", error);
    }
  };

  return (
    <div className="ride-share">
      <Header />
      <h1><span>Customer</span> Dashboard</h1>
      <div className="search-bar">
        <form className='form' onSubmit={handleSubmit} >
          <div className='input-div'>
            <input className="user-inp" type="text" placeholder="Start Location" name='startLocation' value={data.name} onChange={handleChange} />
            <input className="user-inp" type="text" placeholder="End Location" name='endLocation' value={data.name} onChange={handleChange} />
            <input className="user-inp" type="text" placeholder="Price" name='price' value={data.name} onChange={handleChange} />
            <input className="user-inp" type="text" placeholder="Distance (in km)" name='distance' value={data.name} onChange={handleChange} />
          </div>
          <div className='btn-div'>
            {error && <div className="Error">{error}</div>}
            <button className='sub-button'>Search</button>
          </div>
        </form>
      </div>

      {flag === "True" && <div className="drivers-data">
        <div className="driver-header">Available Drivers</div>
        {drivers.map(driver => (
          <div className='driver-list' key={driver.id}>
            <div>Driver Name: {driver.first_name} {driver.last_name}</div>
            <div>Rating: {driver.rating / driver.number_of_rides}</div>
            <div>Contact Number: {driver.contact_number}</div>
            <div>Vehicle Number: {driver.vehicle_number}</div>
            <div>
              <button className='driver-btn' onClick={() => handleDriverSelect(`${driver.first_name} ${driver.last_name}`, driver.vehicle_number)}>Select This Driver</button>
              {rideError && <div className="Error-Msg">{rideError}</div>}
            </div>
          </div>
        ))}
      </div>}

      <div className='Ratings'>
        <div className='ratings-header'>Rate your driver</div>
        <div>
          <input placeholder='Rating (1-5)' className='rating-form' type="number" min="1" max="5" value={ratingVal} onChange={(e) => setRatingVal(e.target.value)} />
        </div>
        <div>
        {ratError && <div className="RatError">{ratError}</div>}
        <button className='rating-btn' onClick={handleRatings}>Submit Rating</button>
        </div>
      </div>

      <div className="customer-rides">
        <div className="customer-header">My Rides</div>
        {customerRides.map(customerRide => (
          <div className='rides-list' key={customerRide.id}>
            <div>Driver Name: {customerRide.driver}</div>
            <div>Start Location: {customerRide.startLocation}</div>
            <div>End Location: {customerRide.endLocation}</div>
            <div>Fare: {customerRide.price}</div>
            <div>Distance: {customerRide.distance}</div>
            <div>------------------------------------------</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
