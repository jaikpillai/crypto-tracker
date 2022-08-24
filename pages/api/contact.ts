import { NextApiHandler } from "next";
let nodemailer = require("nodemailer");

const handler: NextApiHandler = (req, res) => {
  const userData = req.body.userData;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });

  const mailData = {
    from: userData.email.toString(),
    to: process.env.SMTP_MAIL,
    subject: `Message From ${userData.name.toString()}`,
    text: userData.message.toString(),
    html: `<div>${userData.message.toString()}</div>`,
  };

  transporter.sendMail(mailData, function (err: any, info: any) {
    if (err) res.status(500).json({ message: "Encountered a problem" });
    else res.status(200).json({ message: "Message successfully sent" });
  });
};

export default handler;
