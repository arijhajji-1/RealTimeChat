const express = require('express');

const Plat =require('../models/Plat');

exports.addPlat = async(req,res) =>
{
    try{
        const newPlat = new Plat(
            {
                plat_name: req.body.plat_name,

                nbre_ingredient: req.body.nbre_ingredient,
                description: req.body.description,
                plat_image: req.file.originalname,
                price: req.body.price,
            }
        );
        await newPlat.save();
        res.send({response:newPlat, message:"Plat is saved"});
    }
    catch(error){
        res.send({message:"can not save Plat"});
    }
}
