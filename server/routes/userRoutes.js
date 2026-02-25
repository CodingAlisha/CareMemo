

const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const Meal = require('../models/Meal');
const MedicalAlert = require('../models/Medical');
const Medication = require('../models/Medication');
const Schedule = require('../models/Schedule');
const Physician = require('../models/Physician');


// user registration signup page
router.get('/signUp', userController.getSignUp);

// create a new user in db
router.post('/signUp', userController.createSignUp);

// log a user in
router.get('/login', userController.getLogin);

// authenticate a current user then add 
router.post('/login', userController.createLogin);

// log a user out
router.get('/logout', userController.logout);

router.get('/', userController.getLanding);

router.get('/schedule', userController.getSchedule);

router.post('/schedule', userController.createSchedule);

router.get('/listMeals', userController.getMeal);

router.post('/listMeals', userController.createMeal);

router.get('/physician', userController.getPhysician);

router.post('/physician', userController.createPhysician);

router.get('/medicalAlert', userController.getMedicalAlert);

router.post('/medicalAlert', userController.createMedicalAlert);

router.get('/medication', userController.getMedication);

router.post('/medication', userController.createMedication);

router.delete('/deleteMeals/:id', userController.deleteItem(Meal));

router.delete('/deleteMedicalAlert/:id', userController.deleteItem(MedicalAlert));

router.delete('/deletePhysician/:id', userController.deleteItem(Physician));

router.delete('/deleteSchedule/:id', userController.deleteItem(Schedule));

router.delete('/deleteMedication/:id', userController.deleteItem(Medication));

router.get('/authUser', userController.checkUser);


module.exports = router;