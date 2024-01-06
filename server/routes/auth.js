const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Customer } = require('../models/customer');
const { Driver } = require('../models/driver');
const { Admin } = require('../models/admin');

router.post('/', async (req, res) => {
  try {

    const { error } = validate(req.body);
  
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let user;
    let userType;

    if (req.body.role === 'customer') {
      user = await Customer.findOne({ email: req.body.email });
      userType = 'customer';
    } else if (req.body.role === 'driver') {
      user = await Driver.findOne({ email: req.body.email });
      userType = 'driver';
    } else if (req.body.role === 'admin') {
      user = await Admin.findOne({ email: req.body.email });
      userType = 'admin';
    } else {
      return res.status(400).send({ message: 'Invalid user type' });
    }

    if (!user) {
      return res.status(401).send({ message: `${userType} does not exist` });
    }

    if (req.body.password !== user.password) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    if ((user.authorized === false) && (user.role !== 'admin')) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    
    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email, first_name: user.first_name, last_name: user.last_name},
      'DB-Proj',
      { expiresIn: '1h' }
    );
    
    res.status(200).send({ data: token, message: `Logged in as ${userType} successfully!` });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
    role: Joi.string().valid('customer', 'driver','admin').required().label('Role'),
  });

  return schema.validate(data);
};

module.exports = router;
