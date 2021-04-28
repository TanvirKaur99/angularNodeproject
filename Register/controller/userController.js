require('../model/registerModel');
require('../config/passportConfig');

const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var UserData=mongoose.model('userRegister');//UserData object created for userRegister Model

//Function for Adding new user or register a user
module.exports.addnew=(req,res)=>{
    var myData=new UserData({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password,
    });
    myData.save().then((docs)=>{
        return res.status(200).json({
            message:'Data inserted successfully',
            success:true,
            data:docs 
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            message:'Error in adding new user',
            success:false,
            error:err.message
        })
    });
}

//to check authentication :if user is registered it will generate token

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'1000m'}),
            "user":user
        });
        if(info) return res.status(401).json(info);
    })(req,res,next)
}
