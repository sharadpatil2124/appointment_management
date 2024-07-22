const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const appointmentSchema = mongoose.Schema({
    patientId : {type : mongoose.Schema.Types.ObjectId, ref:'Patient'},
    doctorId : {type : mongoose.Schema.Types.ObjectId, ref:'Doctor'},
    appointmentDateTime : {type : Date, required : true},
    status : {type : String, enum:["Pending","Accepted","Rejected"],default :"Pending"}
});


const Appointment = mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;



 