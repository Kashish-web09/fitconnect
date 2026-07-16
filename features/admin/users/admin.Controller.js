import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import adminModels from "./admin.Model.js";
import adminRepo from "./admin.Repository.js";
import { jwtToken } from '../../../middleware/adminJWTAuth.Middleware.js';
import { welcomeMail } from '../../../config/emailService.js';

export default class adminController{
    constructor() {
        this.adminRepo=new adminRepo();
    }

    async signupPage(req,res,next){
        try {
            return res.render("adminUIFiles/signup",{
                title:"Admin Register Page",
                error:{}
            })
        } catch (err) {
            next(err)
        }
    }
        async signup(req,res,next){
        try {
            const {name,username,email,phoneno,password,confirmPass}=req.body;
            const admin=await this.adminRepo.findAdmin(email);
            if(admin){
                return res.render("adminUIFiles/signup",{
                    error:"Admin already exists",
                    errors:{}
                })
            }
            if(password!==confirmPass){
                return res.render("adminUIFiles/signup",{
                    error:"Password not match",
                    errors:{}
                })
            }
            const hashedPass=await bcrypt.hash(password,13);
            const image=req.file ? req.file.filename :null
            const newAdmin=new adminModels(
                name,
                username,
                email,
                phoneno,
                hashedPass,
                image
            )
            await this.adminRepo.signup(newAdmin)
            await welcomeMail(newAdmin.name,newAdmin.email)
            res.redirect('/adminUser/signin')
        } catch (err) {
            next(err)
        }
    }
    async signinPage(req,res,next){
        try {
            return res.render("adminUIFiles/signin",{
                title:"Admin Login Page",
                errors:{}
            })
        } catch (err) {
            next(err)
        }
    }
    async signin(req,res,next){
        try {
            const {email,password}=req.body;
            const admin=await this.adminRepo.findAdmin(email);
            if(!admin){
                            return res.status(404).render('adminUIFiles/signin',{
                                errors:{msg:"Invalid email or password"}
                            });

            }
            const isMatch=await bcrypt.compare(password,admin.password);
            if(!isMatch){
                                            return res.status(404).render('adminUIFiles/signin',{
                                errors:{msg:"Invalid email or password"}
                            });
            }
            const token=jwt.sign(
                {
                    adminId:admin._id,
                    email:admin.email
                },
                process.env.JWT_SECRET_KEY,
                {
                        expiresIn:"2d"

                }
            );
            res.cookie("admintoken",token,{
                httpOnly:true,
                secure:false,
                maxAge:2*24*60*60*1000
            });
                        res.redirect('/adminDashboard')

        } catch (err) {
            next(err)
        }
    }

}