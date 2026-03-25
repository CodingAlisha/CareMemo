

const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const Meal = require('../models/Meal');
const MedicalAlert = require('../models/Medical');
const Medication = require('../models/Medication');
const Schedule = require('../models/Schedule');
const Physician = require('../models/Physician');
const { requireAuth } = require('../middleware/requireAuth');


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

// AUTHENTICATED ROUTES W/REQUIRE AUTH

// router.get('/home', requireAuth, userController.getHome);

router.get('/schedule', requireAuth, userController.getSchedule);

router.post('/schedule', requireAuth, userController.createSchedule);

router.get('/listMeals', requireAuth, userController.getMeal);

router.post('/listMeals', requireAuth, userController.createMeal);

router.get('/physician', requireAuth, userController.getPhysician);

router.post('/physician', requireAuth, userController.createPhysician);

router.get('/medicalAlert', requireAuth, userController.getMedicalAlert);

router.post('/medicalAlert', requireAuth, userController.createMedicalAlert);

router.get('/medication', requireAuth, userController.getMedication);

router.post('/medication', requireAuth, userController.createMedication);

router.delete('/deleteMeals/:id', userController.deleteItem(Meal));

router.delete('/deleteMedicalAlert/:id', userController.deleteItem(MedicalAlert));

router.delete('/deletePhysician/:id', userController.deleteItem(Physician));

router.delete('/deleteSchedule/:id', userController.deleteItem(Schedule));

router.delete('/deleteMedication/:id', userController.deleteItem(Medication));


router.get('/checkUser', requireAuth, userController.checkUser);

// router.get('/authUser', requireAuth, userController.authUser);


module.exports = router;