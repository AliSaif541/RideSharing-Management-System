const router = require('express').Router();
const { Driver, validate } = require('../models/driver');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const driver = await Driver.findOne({ email: req.body.email });
    if (driver) {
        return res.status(409).send({ message: 'Driver already exists!' });
    }

    await new Driver(req.body).save();
    res.status(201).send({ message: "Driver created successfully!" });

  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
  }
});

router.get('/', async (req, res) => {
  try {
      const driverEmail = req.query.email;
      const driver = await Driver.findOne({ email: driverEmail });
      res.json(driver);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching drivers' });
  }
});


router.post('/available', async (req, res) => {
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
      res.send({ message: "Driver updated successfully", driver });

  } catch (err) {
      res.status(500).json({msg: "Internal Server Error"});
  }
});

module.exports = router;
