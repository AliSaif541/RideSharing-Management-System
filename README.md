# RideSharing Management System

## Overview

The RideSharing Management System is a web application built on the MERN (MongoDB, Express.js, React, Node.js) stack. I created this project as part of my CS334-Databases project.

## Features

- **User Authentication:** Secure user registration and authentication system.
- **Create Rides:** Users can create new rides.
- **Ride History:** Keep track of past rides, including details such as start location, end location, price, etc.
- **Provide Ratings:** Customers can provide ratings to their drivers and vice versa.
- **Admin Dashboard:** Manage all the customers and drivers by authenticating them, removing them etc.

## Technologies Used

- **Frontend:**
  - React.js
  - Create React App
  - React Router for navigation
  - Axios for API requests
  - CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for data storage
  - Mongoose as ODM (Object Data Modeling)

- **Authentication:**
  - JSON Web Tokens (JWT) for secure user authentication

## Getting Started

Follow these steps to set up and run the RideSharing Management System on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/alisaif541/ridesharing-management-system.git
   cd ridesharing-management-system
2. **Install Dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
3. **Configure Environment Variables:**
   - Create a .env file in the server directory and configure variables like MongoDB URI, JWT secret, etc.
4. **Run the Application:**
   - In the server directory, run:
      ```bash
      Copy code
      npm run start
   - In the client directory, run:
      ```bash
      Copy code
      npm run start
5. **Access the Application:**
   - Open your browser and navigate to http://localhost:3000 to use the application.
