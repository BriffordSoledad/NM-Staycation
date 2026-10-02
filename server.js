require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post("/send-email", async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: `"NM Staycation" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: "New Contact Form Message",
            html: `
                <h2>New Contact Message</h2>
                <p><b>Name:</b> ${firstName} ${lastName}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>${message}</b></p>
            `
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});