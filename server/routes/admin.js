const router = require('express').Router();
const { Admin } = require('../models/admin');
const { Customer} = require('../models/customer');
const { Driver } = require('../models/driver');

router.post('/auth/customer', async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
        return res.status(409).send({ message: 'Customer not found!' });
    }

    customer.authorized = true;
    await customer.save();
    res.status(201).send({ message: "Authorized successfully!" });
  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

router.post('/remove/customer', async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
        return res.status(409).send({ message: 'Customer not found!' });
    }

    await Customer.deleteOne({ email: req.body.email });

    res.status(201).send({ message: "Removed successfully!" });
  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

router.post('/remove/driver', async (req, res) => {
  try {
    console.log(req.body.email);
    const driver = await Driver.findOne({ email: req.body.email });
    if (!driver) {
        return res.status(409).send({ message: 'Driver not found!' });
    }

    await Driver.deleteOne({ email: req.body.email });

    res.status(201).send({ message: "Removed successfully!" });
  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

router.post('/auth/driver', async (req, res) => {
  try {
    const driver = await Driver.findOne({ email: req.body.email });
    if (!driver) {
        return res.status(409).send({ message: 'Customer not found!' });
    }

    driver.authorized = true;
    await driver.save();
    res.status(201).send({ message: "Authorized successfully!" });
  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

router.post('/', async (req, res) => {
    if (req.body.action === 'print_customers') {
      const customers = await Customer.find();
      res.status(200).send({ customers });
    } 
    else if (req.body.action === 'print_drivers') {
      const drivers = await Driver.find();
      res.status(200).send({ drivers });
    }
    else{
      try{
        const admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(409).send({ message: 'Admin already exists!' });
        }
        if (req.body.key !== 'aliqasim786') {
            return res.status(409).send({ message: 'Admin key is not correct!' });
        }

        await new Admin(req.body).save();
        res.status(201).send({ message: "Admin created successfully!" });

      } catch (err) {
        res.status(500).json({msg: "Internal Server Error"});
      }
    }
});

module.exports = router;
