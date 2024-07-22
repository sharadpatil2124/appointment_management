const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = mongoose.Schema({
    name : {type : String},
    phone : {type : Number},
    email : {type : String, required : true},
    password : {type : String, required : true},
    address : {type : String},
    specialist : {type : String}
});
  

//hash
doctorSchema.pre('save',async function (next){
    const doctor = this;
    if(doctor.isModified('password')){
        doctor.password = await bcrypt.hash(doctor.password, 8);
        console.log(doctor.password);
    }
    next();
}); 

doctorSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


const Doctor = mongoose.model("Doctor",doctorSchema);

module.exports = Doctor;

// {
//     "name" : "doctor1",
//     "phone" : "761984230",
//     "email" : "doctor1@gmail.com",
//     "password" : "doctor1",
//     "address" : "Pune",
//     "specialist" : "Neuro Sergen" 
// }