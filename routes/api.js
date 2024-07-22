const express = require('express');
const paitentController = require('../controllers/paitentController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController')
const authorise = require('../middleware/authorise');

const router = express.Router();

//Patient
router.post('/addPaitent',paitentController.addPaitent);
router.post('/loginPatient',paitentController.loginPatient);    
router.get('/getAllPatient',authorise,paitentController.getAllPatient);

//Doctor
router.post('/addDoctor',doctorController.addDoctor);
router.post('/loginDoctor',doctorController.loginDoctor);
router.get('/getAllDoctor',doctorController.getAllDoctor);

//Appointment
router.post('/addAppointment',appointmentController.addAppointment);
router.get('/getAllAppointment',appointmentController.getAllAppointment);
router.get('/getAppointmentByPatient',appointmentController.getAppointmentByPatient);
router.delete('/deleteAppointmentByPatient/:id',appointmentController.deleteAppointmentByPatient);

router.get('/getAppointmentByDoctor',appointmentController.getAppointmentByDoctor);
router.put('/updateAppointmentByDoctor/:id',appointmentController.updateAppointmentByDoctor);



module.exports = router; 