

const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');




router.get('/', userController.getLanding);

// router.get('/home', userController.getHome);

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

module.exports = router;