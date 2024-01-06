const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    startLocation: {
        type: String,
         required: true
        },
    endLocation: {
        type: String,
         required: true
        },
    price: {
        type: Number,
        required: true,
        },
    distance: {
        type: Number,
         required: true,
        },
    customer: {
        type: String,
         required: true
        },
    driver: {
        type: String,
         required: true
        },
    vehicleNumber: {
        type: String,
         required: true
        },
    isCompleted: {
        type: String,
        required: true
        }
});


function generateAuthToken() {
    const token = jwt.sign({_id: this._id}, 'ALI+QASIM_DB', {expiresIn: "365d"});
    return token;
}

userSchema.methods.generateAuthToken = generateAuthToken();

const Rides = mongoose.model("rides", userSchema);
const rideValidate = (data) => {
    const schema = Joi.object({
        startLocation: Joi.string().required().label("Start Location"),
        endLocation: Joi.string().required().label("End Location"),
        price: Joi.number().required().label("Price"),
        distance: Joi.number().required().label("Distance"),
        customer: Joi.string().email().required().label("Customer"),
        driver: Joi.string().required().label("Driver"),
        vehicleNumber: Joi.string().required().label("Vehicle Number"),
        isCompleted: Joi.string().required().label("Has Accepted"),
  });

  return schema.validate(data)
};

module.exports = { Rides, rideValidate };