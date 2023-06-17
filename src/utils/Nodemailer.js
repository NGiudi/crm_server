import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

export class Nodemailer {

    static sendEmail = async (msg) =>{
        const config = {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        }
        const transport = nodemailer.createTransport(config);
        await transport.sendMail(msg);
    } 
}