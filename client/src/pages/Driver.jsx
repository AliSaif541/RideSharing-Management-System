import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import '../styles/driver.css'
import Header from '../components/header'

const Driver = () => {
    const [driver, setDriver] = useState();
    const [customer, setCustomer] = useState({
        first_name: "",
        role: "",
        email: "",
        password: "",
        last_name: "",
        contact_number: 0,
        rating: 0,
        number_of_rides: 0,
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
    const [ratingVal, setRatingVal] = useState(0);
    const [customerRides, setCustomerRides] = useState([]);
    const [driverCurrentRides, setDriverCurrentRides] = useState([]);
    const [flag, setFlag] = useState("False");
    const [driverEmail, setDriverEmail] = useState("");
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwtDecode(token);
            setDriverEmail(user.email);
            setData({ ...data, driver: `${user.first_name} ${user.last_name}` });
        }
    }, []);

    const fetchCustomerRides = async () => { 
        try {
            const response = await axios.get(`http://localhost:9000/api/rides/driver?name=${encodeURIComponent(data.driver)}`);
            setCustomerRides(response.data);
            const availableDrivers = response.data.filter(ride => ride.isCompleted === "0");
            setDriverCurrentRides(availableDrivers);
            setFlag("True")
        } catch (error) {
            console.error("Error fetching customer rides: ", error);
        }
    };

    const handleRatings = async (e) => {
        try {
            e.preventDefault();
    
            if (driverCurrentRides.length === 1) {
                const customerEmail = driverCurrentRides[0].customer;
    
                const response = await axios.get(`http://localhost:9000/api/customer?email=${encodeURIComponent(customerEmail)}`);
                setCustomer(customer => ({ ...customer, ...response.data }));
    
                let calNumRatings = response.data.number_of_rides + 1; 
                let numericRatingVal = parseFloat(ratingVal);
                let calRating = response.data.rating + numericRatingVal;
    
                const url = `http://localhost:9000/api/ratings/customer`;
                await axios.post(url, {
                    first_name: response.data.first_name,
                    role: response.data.role,
                    email: response.data.email,
                    password: response.data.password,
                    last_name: response.data.last_name,
                    contact_number: response.data.contact_number,
                    rating: calRating,
                    number_of_rides: calNumRatings,
                    authorized: response.data.authorized,
                });
                setRatError("Rating Added Successfully!");
            } else {
                setRatError("Cannot determine the customer for rating.");
            }
        } catch(err) {
            console.error(err);
            setRatError(err.message);
        }
    }

    const completeRide = async (e) => {
        try {
            e.preventDefault();
    
            if (driverCurrentRides.length === 1) {
                const response = await axios.get(`http://localhost:9000/api/driver?email=${encodeURIComponent(driverEmail)}`);
                setDriver(response.data);

                const url1 = `http://localhost:9000/api/driver/available`;
                await axios.post(url1, {
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    role: response.data.role,
                    email: response.data.email,
                    password: response.data.password,
                    vehicle: response.data.vehicle,
                    contact_number: response.data.contact_number,
                    rating: response.data.rating,
                    number_of_rides: response.data.number_of_rides,
                    vehicle_number: response.data.vehicle_number,
                    available: "True",
                    authorized: response.data.authorized,
                });
                console.log(driverCurrentRides[0])
                const url = `http://localhost:9000/api/rides/isComplete`;
                await axios.post(url, {
                    _id: driverCurrentRides[0]._id,
                    startLocation: driverCurrentRides[0].startLocation, 
                    endLocation: driverCurrentRides[0].endLocation, 
                    price: driverCurrentRides[0].price, 
                    distance: driverCurrentRides[0].distance,
                    customer: driverCurrentRides[0].customer,
                    driver: driverCurrentRides[0].driver,
                    vehicleNumber: driverCurrentRides[0].vehicleNumber,
                    isCompleted: '1',
                });
                setError("Ride Completed Successfully!");
            } else {
                setError("An error occurred while completing the ride.");
            }
        } catch(err) {
            console.error(err);
            setError(err.message);
        }
    }
    

    return (
        <div className="container">
            <Header />
            <h1><span>Driver</span> Dashboard</h1>
            <div className="driver-data">
                <div className="driver-head">Current Ride</div>
                <button className='driver-button' onClick={fetchCustomerRides}>Show Current Ride Details</button>
                <div className='driver-list-container'>
                    {flag === "True" && driverCurrentRides.map((ride, index) => (
                        <div className='driver-list-item' key={index}>
                            <div>Customer Email: {ride.customer}</div>
                            <div>Start Location: {ride.startLocation}</div>
                            <div>End Location: {ride.endLocation}</div>
                            <div>Fare: {ride.price}</div>
                            <div>Distance: {ride.distance}</div>
                            <button className='complete-ride-button' onClick={completeRide}>Complete Ride</button>
                        </div>
                    ))}
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>

            <div className='ratings-container'>
                <div className='ratings-head'>Rate the Customer</div>
                <div className='ratings-input-container'>
                    <input placeholder='Rating (1-5)' className='rating-input' type="number" min="1" max="5" value={ratingVal} onChange={(e) => setRatingVal(e.target.value)} />
                </div>
                <div className='ratings-btn-container'>
                    {ratError && <div className="error-message">{ratError}</div>}
                    <button className='submit-rating-button' onClick={handleRatings}>Submit Rating</button>
                    {/* {ratError && <div className="error-message">{ratError}</div>} */}
                </div>
            </div>

            <div className="customer-rides-container">
                <div className="customer-head">My Rides</div>
                {customerRides.map(customerRide => (
                    <div className='rides-list-item' key={customerRide.id}>
                        <div>Customer Email: {customerRide.customer}</div>
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

export default Driver;
