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
    contact_number: {
        type: Number,
         required: true
        },
    rating: {
        type: Number,
         required: true
        },
    role: {
        type: String,
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
    number_of_rides: {
        type: Number,
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

const Customer = mongoose.model("customer", userSchema);
const customerValidate = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().required().label("First_Name"),
        role: Joi.string().required().label("Role"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        last_name: Joi.string().required().label("Last_Name"),
        contact_number: Joi.number().required().label("Contact_Number"),
        rating: Joi.number().required().label("Rating"),
        number_of_rides: Joi.number().required().label("Number of Rides"),
        authorized: Joi.boolean().required().label("Authorized"),   
    });

  return schema.validate(data)
};

module.exports = { Customer, customerValidate };