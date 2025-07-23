const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.yourserver.com', // e.g. smtp.gmail.com
    port: 587,
    secure: false,
    auth: {
      user: 'your@email.com',
      pass: 'yourpassword' // App-specific password if using Gmail
    }
  });

  try {
    await transporter.sendMail({
      from: `"Wokd Contact" <your@email.com>`,
      to: 'your@email.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
