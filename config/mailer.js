import dotenv from "dotenv";
dotenv.config();

import nodemailer from 'nodemailer';

const transport=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.SENDER_EMAIL,
        pass:process.env.APP_PASS
    }
    
});
export default transport;