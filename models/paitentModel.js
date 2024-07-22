const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = mongoose.Schema({
    name : {type : String},
    email : {type : String, required : true},
    password : {type : String, required : true},
    phone : {type : Number},
    address : {type : String},
    bloodgroup : {type : String},
    gender : {type : String, enum :["male","female"],required : true},
    age : {type : Number}
});

//hash password
patientSchema.pre('save',async function(next){
    const paitent = this;
    if(paitent.isModified('password')){
        paitent.password = await bcrypt.hash(paitent.password, 8);
        console.log("***//",paitent.password);
    }
    next();
});

patientSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};




const Patient = mongoose.model("Patient",patientSchema);

module.exports = Patient;


// {
//     "name" : "patient1",
//     "email" :"paitent@gmail.com",
//     "password" :"patient1",
//     "phone" : "9638527410", 
//     "address" :"Kolhapur",
//     "bloodgroup" : "AB+",
//     "gender" :"male",
//     "age" : 25
// }