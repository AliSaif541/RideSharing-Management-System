const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
         required: true
        },
    last_name: {
        type: String,
         required: true
        },
    role: {
        type: String,
         required: true
        },
    rating: {
        type: Number,
         required: true,
         limit : 5
        },
    number_of_rides: {
        type: Number,
         required: true
        },
    vehicle: {
        type: String,
         required: true
        },
    vehicle_number: {
        type: String,
         required: true
        },
    contact_number: {
        type: Number,
         required: true
        },
    email: {
        type: String,
         required: true
        },
    password: {
        type: String,
         required: true
        },
    available: {
        type: String,
        required: true
        },
    authorized: {
        type: Boolean,
        default: false
        },
});


function generateAuthToken() {
    const token = jwt.sign({_id: this._id}, 'ALI+QASIM_DB', {expiresIn: "365d"});
    return token;
}

userSchema.methods.generateAuthToken = generateAuthToken();

const Driver = mongoose.model("driver", userSchema);
const validate = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().required().label("First_name"),
        last_name: Joi.string().required().label("Last_name "),
        role: Joi.string().required().label("Role"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        vehicle: Joi.string().required().label("Vehicle"),
        contact_number: Joi.number().required().label("Contact Number"),
        rating: Joi.number().required().label("Rating"),
        number_of_rides: Joi.number().required().label("Number of Rides"),
        vehicle_number: Joi.string().required().label("Vehicle Number"),
        available: Joi.string().required().label("Available"),
        authorized: Joi.boolean().required().label("Authorized"),
    });

  return schema.validate(data)
};

module.exports = { Driver, validate };