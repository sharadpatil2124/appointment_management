const { default: mongoose } = require('mongoose');
const Appointment = require('../models/appointmentModel');
const jwt = require('jsonwebtoken');

async function addAppointment(req,res){
    const appointment = req.body;

    try {
        const appointmentDetails = {
            doctorId : new mongoose.Types.ObjectId(appointment.doctorId),
            patientId : new mongoose.Types.ObjectId(appointment.patientId),
            appointmentDateTime : appointment.appointmentDateTime
        };
        const newAppointment = new Appointment(appointmentDetails);
        const result = await newAppointment.save();
        
     
          res.status(200).send({message : "Appoinment added Successfully",result});
    } catch (error) {
        res.status(500).send(error);
    } 
}

async function getAllAppointment(req,res){
    try {
        result = await Appointment.find({},{__v:0});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getAppointmentByPatient(req,res){
    try {
        const patientid = req.query.patientId;
        const appointment = await Appointment.find({patientId : patientid});
        console.log(appointment);
        if(!appointment){
            return res.status(404).json({message : "no appointment found for this patient"});
        }
        return res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteAppointmentByPatient(req,res){
    const pid = req.params.id
    try {
        const appointment = await Appointment.findByIdAndDelete(pid);
        console.log(appointment);
        if(!appointment){
            res.status(400).send({message : "Appointment not fount for this patient"});
        }
        res.status(200).send(appointment);

    } catch (error) {
        res.status(500).send(error);
    }
}

async function getAppointmentByDoctor(req,res){
    try {
        const doctorid = req.query.doctorId;
        const appointment = await Appointment.find({doctorId : doctorid});
        if(!appointment){
            return res.status(404).json({message : "no appointment fount for this doctor"});
        }
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateAppointmentByDoctor(req,res){
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id,req.body,{new : true});
        if(!appointment){
            res.status(400).send({message : "Appoiment not found"});
        }
        res.status(200).send({message : "Appoiment updated"})
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addAppointment,
    getAllAppointment,
    getAppointmentByPatient,
    deleteAppointmentByPatient,
    getAppointmentByDoctor,
    updateAppointmentByDoctor
}
