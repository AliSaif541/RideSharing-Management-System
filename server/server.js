const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const customerRoutes = require("./routes/customer");
const driverRoutes = require("./routes/driver");
const authRoutes = require("./routes/auth");
const ridesRoutes = require("./routes/rides");
const ratingRoutes = require("./routes/rating");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/users")
.then(()=>{
    app.listen(9000, ()=>{
        console.log(`listening on port ${9000}`);
        console.log("Connected to Database");
    })
})
.catch((error)=>{
    console.log(error);
});

app.use("/api/customer", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/rides/", ridesRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);


module.exports = app;
