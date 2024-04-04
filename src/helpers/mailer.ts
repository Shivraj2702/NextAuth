import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs"
import User from '@/models/userModel';

export const sendEmail = async ({email, emailType , userId}:any) => {
   try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    if(emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId ,{ verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000} )
    } else if(emailType === "RESET" ) {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000} )
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "75ef0d98d495df",
        pass: "086fd69e679829"
      }
    });
 
      const mailOptions =  {
         from: 'shivraj@.com', 
         to: email, 
         subject: emailType == 'VERIFY' ? "verify your email" : "Reset your password",
         html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
         or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
         </p>`
       }

       const mailRespone = await transport.sendMail(mailOptions)
       return mailRespone;
   } catch (error: any) {
        throw new Error(error.message)
   }
}