import { transporter } from  "../config/Email.config.js";
//after the user data is saved it sends the email with verification code at this file
import { Verification_Email_Template } from "./EmailTemplate.js";
import { Welcome_Email_Template } from "./EmailTemplate.js";

export const SendVerificationCode=async(email,verificationCode)=>{
    try {
        const response = await transporter.sendMail({
            from: '"Setflix 👻" <khatriyubraj1157@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your Email ✔", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // html body
          });
        console.log('Email sent successfully',response);
    } catch (error) {
        console.log('Email error');
    }
}

export const WelcomeEmail=async(email,username)=>{
    try {
        const res = await transporter.sendMail({
            from: '"Setflix 👻" <khatriyubraj1157@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome Email ✔", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",username), // html body
          });
        console.log('Email sent successfully',res);
    } catch (error) {
        console.log('Email error while sending a Welcome email');
    }
}
