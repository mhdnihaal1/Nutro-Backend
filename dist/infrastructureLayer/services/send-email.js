"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class sendOtp {
    constructor() {
        // console.log("Initializing Nodemailer transporter...");
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "nihalmuhaednihal@gmail.com",
                pass: "ixvz kvcj ruqt wjyj",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    sendMail(email, otp) {
        console.log("came here sendmail inside services / sendMail");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "Nutro Email Verification",
            text: `${email},your verification code is: ${otp}`,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err  from send mail  :", err);
            }
            else {
                console.log("verification code sent successfully");
            }
        });
    }
    sendCancelMail(email) {
        console.log("came here sendmail inside services / sendMail");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "Your Order has been cancelled  successfull  ",
            text: `We are cancelling  your order as per your wish  `,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err  from send mail1  :", err);
            }
            else {
                console.log("Cancel Mail  sent successfully");
            }
        });
    }
    sendMailtoadmin(email) {
        console.log("came here sendmail inside services / sendMail");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "I am sending this mail  for some of your serivce concerns  ",
            text: `Please assure that you that check our concerns that we send to you  `,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err  from send mail  :", err);
            }
            else {
                console.log("concern Mail  sent successfully");
            }
        });
    }
    forgetPassword(email, otp) {
        console.log("came here sendmail inside services / sendMail");
        console.log(123, otp);
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "Forget otp verification  ",
            text: `${email},your foget passowrd reset otp  verification code is: ${otp}`,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err  from send mail  :", err);
            }
            else {
                console.log("concern Mail  sent successfully");
            }
        });
    }
    sendConcernReplyMail(email, text) {
        console.log("came here sendmail inside services / sendMail");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "Thanks you for reporting the  concern that faces    ",
            text: `Your concern with the service or cloth of ${text}  will be resolve soon`,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err  from send mail  :", err);
            }
            else {
                console.log("Concern Reply Mail  sent successfully");
            }
        });
    }
    sendEmailForDelivery(email) {
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "Your Order has been delivered to your given address successfull  ",
            text: `We are successfully delivered your clothitems to your given address `,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Email For Delivery  sent successfully");
            }
        });
    }
}
exports.default = sendOtp;
