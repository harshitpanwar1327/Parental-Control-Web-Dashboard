import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (req, res) => {
  const {userEmail, report} = req.body;

  const info = await transporter.sendMail({
    from: `"Parenal Control" <${process.env.MAIL_USER}>`,
    to: userEmail,
    subject: "Hello ✔",
    html: report,
  });

  console.log("Message sent:", info.messageId);
}

export default sendEmail;