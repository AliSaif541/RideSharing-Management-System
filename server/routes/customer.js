const router = require('express').Router();
const { Customer, customerValidate } = require('../models/customer');

router.get('/', async (req, res) => {
  try {
      const customerEmail = req.query.email;
      const customer = await Customer.findOne({ email: customerEmail });
      res.json(customer);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching drivers' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = customerValidate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const customer = await Customer.findOne({ email: req.body.email });
    if (customer) {
        return res.status(409).send({ message: 'Customer already exists!' });
    }

    await new Customer(req.body).save();
    res.status(201).send({ message: "Customer created successfully!" });

  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

module.exports = router;
