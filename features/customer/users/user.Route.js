import express from 'express';
import userController from './user.Controller.js';
import { uploads } from '../../../middleware/fileUpload.Middleware.js';
import { userSigninRule,userSignupRules } from './user.Validation.js';
import { validator } from '../../../middleware/commonValidation.Middleware.js';
const customerUserRoute=express.Router();
const usersController=new userController();

// register routes
customerUserRoute.get('/signup',(req,res,next)=>{
    usersController.signupPage(req,res,next)
})

customerUserRoute.post('/signup',uploads.single("image"),userSignupRules,validator("customerUIFiles/signup"),(req,res,next)=>{
    usersController.signup(req,res,next)
})
// login route

customerUserRoute.get('/signin',(req,res,next)=>{
    usersController.signinPage(req,res,next)
})
customerUserRoute.post('/signin',userSigninRule,validator("customerUIFiles/signin"),(req,res,next)=>{
    usersController.signin(req,res,next)
})

export default customerUserRoute;

