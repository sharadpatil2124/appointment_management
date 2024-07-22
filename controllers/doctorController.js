const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');

async function addDoctor(req,res){
    newEmail = req.body.email;
    // password = req.body.password;

    try {
        const doctorExist = await Doctor.findOne({email : newEmail});
        console.log(doctorExist);
        if(doctorExist){
            res.status(201).send({message : 'Doctor already exists'})
            
        }
        
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(200).send({message : 'Doctor added Sucessfully', task : doctor})
    } catch (error) {
        res.status(500).send(error);
    }
} 

async function loginDoctor(req,res){
    try { 
        newEmail = req.body.email;
        password = req.body.password;
        const newdoctor = await Doctor.findOne({email : newEmail});
        if(!newdoctor){
            res.status(400).send({error : 'Invaild login Credentials'});
        }
        isMatch = await newdoctor.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({error : 'Password Incorrect'});
        }
        const token = jwt.sign({_id : newdoctor._id},'prajwal',{expiresIn : '1h'});
        res.status(200).send({acessToken : token});
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getAllDoctor(req,res){
    try {
        const result = await Doctor.find({},{__v:0});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addDoctor,
    loginDoctor,
    getAllDoctor 
}