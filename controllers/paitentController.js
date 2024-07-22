const Patient = require('../models/paitentModel');
const jwt = require('jsonwebtoken');

async function addPaitent(req,res){
    newEmail = req.body.email;

    console.log(req.body);
    try {
        const patientExist = await Patient.findOne({email : newEmail});
        console.log(patientExist);
        if(patientExist){
            res.status(201).send({message : 'Patient already exists'})
        }
        const patient = new Patient(req.body);
        await patient.save();
        res.status(200).send({message : "Patient Registration Successfull",task : Patient})
 
    } catch (error) {
        res.status(500).send(error);
    } 
}

async function loginPatient(req,res){ 
    // newEmail = req.body.email;
    console.log(req.body);
    try {
         newEmail = req.body.email;
         password = req.body.password;
        console.log(password);
        const newpatient = await Patient.findOne({email : newEmail});
        console.log(newEmail);
        if(!newpatient){
            res.status(400).send({error : 'Invaild login Credentials'});
        }
        isMatch = await newpatient.comparePassword(password);
        console.log(isMatch);
        console.log("***/")
        if (!isMatch) {
            console.log(isMatch);
            return res.status(400).send({error : 'Password Incorrect'});
        }
        const token = jwt.sign({_id : newpatient._id},'prajwal',{expiresIn : '1h'});
        res.status(200).send({acessToken : token});
    } catch (error) {
        res.status(500).send(error);
    }
}


async function getAllPatient(req,res){
    try {
        const result = await Patient.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);

    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    addPaitent,
    loginPatient,
    getAllPatient
}