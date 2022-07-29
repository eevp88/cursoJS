const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require("jsonwebtoken");
const { expressjwt: jwt } = require("express-jwt");

const User = require('./user.model')
const SECRET = 'mi-string-secreto'


const validateJwt = jwt({ secret: SECRET, algorithms: ['HS256'] });
const  findAndAssingUser = async (req,res,next) =>{
    try {
        const user = await User.findById(req.auth._id)
        if(!user){
            return res.status(401).end()
        }
        req.user = user
        next()
    } catch (e) {
        next(e)
    }
}
const signToken = _id => jsonwebtoken.sign({ _id}, SECRET)

const isAutenticated = express.Router().use(validateJwt, findAndAssingUser)

const Auth = {
    login : async (req, res)=>{
        const { body } = req
        try {
            const user = await User.findOne({email:body.email})
            if(!user){
                return res.status(403).send('Usuario y/o constraseña incorrecto')
            }
            const isMach = await bcrypt.compare(body.password, user.password)
            if(!isMach){
                return res.status(403).send('Usuario y/o constraseña incorrecto')
            }
            const signed = signToken(user._id)
            res.status(200).send(signed)
        } catch (err) {
            console.error(err)
            res.status(500).send(err.message)
        }
    },
    register: async (req, res) =>{
        const { body } = req
        try {
            const isUser = await User.findOne({email:body.email})
            if(isUser){
                return res.status(403).send('Usuario ya existe')
            }
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(body.password , salt)
            const user = await User.create({email: body.email, password : hashed, salt : salt})
            const signed = signToken(user._id)
            res.status(201).send(signed)
        } catch (err) {
            console.log(err)
            res.status(500).send(err.message)
        }
    }
}

module.exports = {Auth, isAutenticated}