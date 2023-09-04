
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'YOUR_SMTP_SERVER', // Replace with your SMTP server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'YOUR_EMAIL', // Replace with your email
            pass: 'YOUR_PASSWORD' // Replace with your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'YOUR_DESTINATION_EMAIL', // Replace with the destination email
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Mail sent successfully!');
    } catch (error) {
        res.status(500).send('Error sending mail.');
    }
};
