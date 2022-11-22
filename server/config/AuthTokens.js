const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require("dotenv").config();



module.exports = {
    generateAuthToken: ()=>{
        const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn:'2d'})
        return token;   
    },
    AdminAuthToken: ()=>{
        const token = jwt.sign({_id: this._id}, process.env.JWT_ADMIN, {expiresIn:'2d'})
        return token;   
    }
}