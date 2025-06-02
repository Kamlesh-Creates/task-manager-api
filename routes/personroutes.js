const express=require('express');
const router=express.Router()
const Person=require('./../models/person')
const personcontroller=require('./../controllers/personcontroller')

router.post('/signup',personcontroller.signup)

router.post('/login',personcontroller.login)
module.exports=router