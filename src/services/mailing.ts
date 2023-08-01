import nodemailer from 'nodemailer';
import { RESPONSE_STATUS } from '../common/constants';
import { sanitizeHTML } from '../common/helper';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
  });

export const sendConactMail = async (name: string, email: string, message: string) => {
    try {
        const cleanName = sanitizeHTML(name);
        const cleanEmail = sanitizeHTML(email);
        const cleanMessage = sanitizeHTML(message);
        await transporter.sendMail({
            from: process.env.GMAIL_EMAIL,
            to: process.env.GMAIL_EMAIL,
            subject: `Contact message from ${name}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Contact Email</title>
                        <style>
                            * {
                                margin:0;
                                padding:0;
                            }

                            .contact-message-container {
                                width:450px;
                                margin:auto;
                            }
                            .element {
                                padding:0.75rem 0;
                            }
                    
                            .element-name{
                                margin-bottom:0.5rem;
                                font-size:1.2rem;
                                font-weight:bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="contact-message-container">
                            <div class="message-elements">
                                <div class="element">
                                    <p class="element-name">Name</p>
                                    <p class="element-value">${cleanName}</p>
                                </div>
                                <div class="element">
                                    <p class="element-name">Email</p>
                                    <p class="element-value">${cleanEmail}</p>
                                </div>
                                <div class="element">
                                    <p class="element-name">Message</p>
                                    <p class="element-value">${cleanMessage}</p>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
             `
        });

        return {
            status: RESPONSE_STATUS.Success,
            success: true,
            message: 'User exists with the given data'
        }
    } catch (error) {
        throw error;
    }
}