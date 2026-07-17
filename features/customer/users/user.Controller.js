import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userRepo from "./userRepository.js";
import userModels from "./user.Model.js";
import { jwtToken } from '../../../middleware/customerJWTAuth.Middleware.js';
import { welcomeMail } from '../../../config/emailService.js';
export default class userController{
    constructor(){
this.userRepo=new userRepo();
    }
    async signupPage(req,res,next){
try {
    return res.render("customerUIFiles/signup",{
        title:"Registeration Page",
        errors:{}
    })
} catch (err) {
    next(err)
}
    }
    async signup(req,res,next){
        try {

            const {name,email,phoneno,password,confirmPass}=req.body;
            const user=await this.userRepo.findUser(email);
            const image=req.file ? req.file.filename : null
            if(user){
                return res.render('customerUIFiles/signup',{
                    error:"User already exists",
                    errors:{}
                })
            }
            if (password !== confirmPass) {
            return res.render("customerUIFiles/signup", {
                error: "Passwords do not match",
                errors:{}
            });
        }
            const hashedPass=await bcrypt.hash(password,10);
            const newUser=new userModels(
                name,
                email,
                phoneno,
                hashedPass,
                image

                
            )
await this.userRepo.signup(newUser)
await welcomeMail(newUser.name,newUser.email)

            res.redirect('/customerUser/signin')


        } catch (err) {
            next(err)
        }
    }
    async signinPage(req,res,next){
        try {
            return res.render("customerUIFiles/signin",{
                title:"Login Page",
                errors:{}
            })
        } catch (err) {
            next(err)
        }
    }
    async signin(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await this.userRepo.findUser(email);
            if(!user){
                            return res.status(404).render('customerUIFiles/signin',{
                                errors:{msg:"Invalid email or password"}
                            });

            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                                            return res.status(404).render('customerUIFiles/signin',{
                                errors:{msg:"Invalid email or password"}
                            });

            }
            const token=jwt.sign({
userId:user._id,
email:user.email
},
process.env.JWT_SECRET_KEY,
{
    expiresIn:"2d"
}

            );
            res.cookie('customerToken',
                token,{
                httpOnly:true,
                secure:false,
                maxAge:2*24*60*60*1000
            })
            res.redirect('/userDashboard')
            
        } catch (err) {
            next(err)
        }
    }
    
}