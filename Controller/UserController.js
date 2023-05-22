
const fs = require('fs');


const express = require('express');
const user = require('../models/user');
const router = express.Router();


//add

exports.add= async (req,res)=>
{
    try{
        const newuser = new user(
            
            {
                name: req.body.name,
                email: req.body.email,
                cin: req.body.cin,
                image: req.file.originalname,
                telephone:req.body.telephone
                
            }
        );
        await newuser.save();
        res.send({response:newuser, message:"user is saved"});
       
    }
    catch(error){
    
        res.send({message:"can not save user"});
       
    }
}
//update a user by id

exports.modify = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        cin: req.body.cin,
        image: req.file.originalname,
        telephone: req.body.telephone
      };
  
      const result = await user.updateOne({ _id: id }, updatedUser);
      
      if (result.nModified === 0) {
        return res.status(404).send({ message: "User not found or no changes applied." });
      }
      
      res.send({ message: "User is modified successfully." });
    } catch (error) {
        console.error(error); // Log the error message

      res.status(500).send({ message: "An error occurred while updating the user." });
    }
  };
  



//remove
exports.remove= async (req,res)=>
{
    try{
        const id = req.params.id;
        const result = await user.deleteOne({_id:id});
    
        res.send({message:"user is deleted"});
    }
    catch(error){
        res.send({message:"there is no user with this id"});
    }

}
//get all

exports.getAll= async (req,res)=>
{
    try{
        const result = await user.find();
        res.send({response:result, message:"users are found"});
    }
    catch(error){
        res.send({message:"there is no user"});
    }
}

//get one
exports.getOne= async (req,res)=>
{
    try{
        const id = req.params.id;
        const result = await user.findOne({_id:id});
        res.send({response:result, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this id"});
    }
}
//get by email
exports.getByEmail= async (req,res)=>
{
    try{
        const email = req.params.email;
        const result = await user.findOne({email:email});
        res.send({response:result, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this email"});
    }
}
//get by cin
exports.getByCin= async (req,res)=>
{
    try{
        const cin = req.params.cin;
        const result = await user.findOne({cin:cin});
        res.send({response:result, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this cin"});
    }
}
//get by name
exports.getByName= async (req,res)=>
{
    try{
        const name = req.params.name;
        const result = await user.findOne({name:name});
        res.send({response:result, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this name"});
    }
}
//get by id
exports.getById= async (req,res)=>
{
    try{
        const id = req.params.id;
        const result = await user.findOne({_id:id});
        res.send({response:result, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this id"});
    }
}
//delete all
exports.removeAll= async (req,res)=>
{
    try{
        const result = await user.deleteMany();
        res.send({message:"users are deleted"});
    }
    catch(error){
        res.send({message:"there is no user"});
    }
}

