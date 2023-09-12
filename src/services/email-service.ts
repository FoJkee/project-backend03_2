import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config()

const EMAIL = process.env.EMAIL
const PASS = process.env.PASS

export class EmailService {

    async sendEmail(email: string, code: string) {

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
            subject: "Registration ✔", // Subject line
            text: "Registration", // plain text body
            html: ' <h1>Thank for your registration</h1>\n' +
                ' <p>To finish registration please follow the link below:\n' +
                ` <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>\n` +
                ' </p>\n', // html body
        })

        return info

    }

}
