import express from 'express';
import adminController from './admin.Controller.js';
import { uploads } from '../../../middleware/fileUpload.Middleware.js';
import { adminSigninRule,adminSignupRules } from './admin.Validation.js';
import { validator } from '../../../middleware/commonValidation.Middleware.js';
const adminRoutes=express.Router();
const adminsController=new adminController();

adminRoutes.get('/signup',(req,res,next)=>{
    adminsController.signupPage(req,res,next)
})
adminRoutes.post('/signup',uploads.single("image"),adminSignupRules,validator("adminUIFiles/signup"),(req,res,next)=>{
    adminsController.signup(req,res,next)
})
adminRoutes.get('/signin',(req,res,next)=>{
    adminsController.signinPage(req,res,next)
})
adminRoutes.post('/signin',adminSigninRule,validator("adminUIFiles/signin"),(req,res,next)=>{
    adminsController.signin(req,res,next)
})

export default adminRoutes;