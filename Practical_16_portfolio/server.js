const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Email configuration (replace with your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form validation rules
const contactValidation = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters long'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
];

// Handle contact form submission
app.post('/contact', contactValidation, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Replace with your email
        subject: `Portfolio Contact: ${subject}`,
        html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});