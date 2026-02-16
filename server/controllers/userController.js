const Physician = require("../models/Physician");
const Meal = require("../models/Meal");
const Schedule = require("../models/Schedule");
const Medical = require("../models/Medical");
const Medication = require("../models/Medication");


console.log('userController loaded');

//GET ROUTE FOR MEALS
module.exports.getLanding = (req, res) => {
    res.json({ message: 'success landing get' });
}

// GET ROUTE FOR SCHEDULE
module.exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find();
   res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedule'})
  }
};


// POST TO CREATE SCHEDULE
module.exports.createSchedule = async (req, res) => {
  try {
    const newSchedule = await Schedule.create(req.body); // save the data
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


    // GET ROUTE FOR PHYSICIANS
    // Import physician model
module.exports.getPhysician = async (req, res) => {
    try {
        const physicians = await Physician.find();
        res.json(physicians);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch physicians'});
    }
};

// POST TO CREATE PHYSICIAN
module.exports.createPhysician = async (req, res) => {
  try {
    const newPhysician = await Physician.create(req.body); // save the data
    res.status(201).json(newPhysician);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// GET ROUTE FOR MEALS
 // Import meal model
module.exports.getMeal = async (req, res) => {
  try {
    // MUST HAVE router.get listMeals
    const listMeals = await Meal.find();
    res.json(listMeals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listMeals'});
  }
};

// POST ROUTE FOR MEALS
// MUST HAVE userController.createMeal
module.exports.createMeal = async (req, res) => {
  console.log(req.body);
  try {
    const newMeal = await Meal.create(req.body);
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ROUTE FOR MEDICAL ALERT
// REMEMBER TO IMPORT MEDICAL FROM MODELS
module.exports.getMedicalAlert = async (req, res) => {
  try {
    const medicalAlertData = await Medical.find();
   res.json(medicalAlertData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medical'})
  }
};

// POST TO CREATE MEDICAL ALERT
module.exports.createMedicalAlert = async (req, res) => {
  try {
    const newMedicalAlertData = await Medical.create(req.body); // save the data
    res.status(201).json(newMedicalAlertData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ROUTE FOR MEDICATION
// REMEMBER TO IMPORT MEDICATION FROM MODELS
module.exports.getMedication = async (req, res) => {
  try {
    const medicationList = await Medication.find();
   res.json(medicationList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medication'})
  }
};

// POST TO CREATE MEDICATION
module.exports.createMedication = async (req, res) => {
  try {
    const newMedication = await Medication.create(req.body); // save the data
    res.status(201).json(newMedication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};