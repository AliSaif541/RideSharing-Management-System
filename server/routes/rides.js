const router = require('express').Router();
const { Rides, rideValidate } = require('../models/rides');
const { Driver, validate } = require('../models/driver');

router.get('/', async (req, res) => {
    try {
      const drivers = await Driver.find({});
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching drivers' });
    }
});

router.get('/customer', async (req, res) => {
    try {
        const customerEmail = req.query.email;
        const rides = await Rides.find({ customer: customerEmail });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drivers' });
    }
});

router.get('/driver', async (req, res) => {
    try {
        const driverName = req.query.name;
        const rides = await Rides.find({ driver: driverName });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drivers' });
    }
});

router.post('/', async (req, res) => {
  try {
    const { error } = rideValidate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    await new Rides(req.body).save();
    res.status(201).send({ message: "Details added successfully!" });

  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

router.post('/driver/flag', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const driver = await Driver.findOne({ email: req.body.email });
        if (!driver) {
            return res.status(404).send({ message: "Driver not found" });
        }

        driver.available = req.body.available;

        await driver.save();
        res.status(201).send({ message: "Details added successfully!" });
  
    } catch (err) {
      res.status(500).json({msg: "Internal Server Error"});
    }
});

router.post('/isComplete', async (req, res) => {
    try {
        console.log(req.body);
        const { _id, ...rideData } = req.body;
        const { error } = rideValidate(rideData);
        if (error) {
            console.log(error)
            return res.status(400).send({ message: error.details[0].message });
        }

        const ride = await Rides.findOne({ _id });
        if (!ride) {
            console.log("ride not found");
            return res.status(404).send({ message: "Ride not found" });
        }

        ride.isCompleted = "1";

        console.log("ride: ", ride);

        await ride.save();
        console.log("ride saved");
        res.status(201).send({ message: "Details added successfully!" });
  
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


module.exports = router;
