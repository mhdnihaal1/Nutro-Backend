import nodemailer from "nodemailer";
import Nodemailer from "../../usecaseLayer/interface/nodeMailer";
import dotenv from "dotenv";
dotenv.config();

class sendOtp implements Nodemailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    // console.log("Initializing Nodemailer transporter...");
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nihalmuhaednihal@gmail.com",
        pass: "ixvz kvcj ruqt wjyj",
      },
    });
  }
 

  sendMail(email: string, otp: number): void {
    console.log("came here sendmail inside services / sendMail");

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "Nutro Email Verification",
      text: `${email},your verification code is: ${otp}`,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err  from send mail  :", err);
      } else {
        console.log("verification code sent successfully");
      }
    });
  }

  sendCancelMail(email: string): void {
    console.log("came here sendmail inside services / sendMail");

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "Your Order has been cancelled  successfull  ",
      text: `We are cancelling  your order as per your wish  `,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err  from send mail  :", err);
      } else {
        console.log("Cancel Mail  sent successfully");
      }
    });
  }

  sendMailtoadmin(email: string): void {
    console.log("came here sendmail inside services / sendMail");

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "I am sending this mail  for some of your serivce concerns  ",
      text: `Please assure that you that check our concerns that we send to you  `,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err  from send mail  :", err);
      } else {
        console.log("concern Mail  sent successfully");
      }
    });
  }

  
  forgetPassword(email: string,otp:string): void {
    console.log("came here sendmail inside services / sendMail");
    console.log(123,otp)

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "Forget otp verification  ",
      text:`${email},your foget passowrd reset otp  verification code is: ${otp}`,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err  from send mail  :", err);
      } else {
        console.log("concern Mail  sent successfully");
      }
    });
  }

  sendConcernReplyMail(email: string, text: string): void {
    console.log("came here sendmail inside services / sendMail");

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "Thanks you for reporting the  concern that faces    ",
      text: `Your concern with the service or cloth of ${text}  will be resolve soon`,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err  from send mail  :", err);
      } else {
        console.log("Concern Reply Mail  sent successfully");
      }
    });
  }

  sendEmailForDelivery(email: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject:
        "Your Order has been delivered to your given address successfull  ",
      text: `We are successfully delivered your clothitems to your given address `,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email For Delivery  sent successfully");
      }
    });
  }
}

export default sendOtp;
