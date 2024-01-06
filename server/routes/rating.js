const router = require('express').Router();
const { Driver, validate } = require('../models/driver');
const { Customer, customerValidate } = require('../models/customer');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const driver = await Driver.findOne({ email: req.body.email });
        if (!driver) {
            return res.status(404).send({ message: "Driver not found" });
        }

        driver.rating = req.body.rating;
        driver.number_of_rides = req.body.number_of_rides;

        await driver.save();
        res.send({ message: "Driver rating updated successfully", driver });

    } catch (err) {
        res.status(500).json({msg: "Internal Server Error"});
    }
});

router.post('/customer', async (req, res) => {
    try {
        const { error } = customerValidate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const customer = await Customer.findOne({ email: req.body.email });
        if (!customer) {
            return res.status(404).send({ message: "Driver not found" });
        }

        customer.rating = req.body.rating;
        customer.number_of_rides = req.body.number_of_rides;

        await customer.save();
        res.send({ message: "Customer rating updated successfully", customer });

    } catch (err) {
        res.status(500).json({msg: "Internal Server Error"});
    }
});

module.exports = router;