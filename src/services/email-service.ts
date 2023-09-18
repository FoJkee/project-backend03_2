import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config()

const EMAIL = process.env.EMAIL
const PASS = process.env.PASS

export class EmailService {

    async sendEmail(email: string, subject: string, message: string) {

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASS
            }
        });

        const info = await transporter.sendMail({
            from: EMAIL, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message // html body
        })

        return info

    }

}
