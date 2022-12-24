const express = require('express');
var app = express();
const router = require('express').Router();
const http = require('http');
app.use(express.json());

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
}));
app.use(bodyParser.json({ limit: '5mb' }));

var nodemailer = require('nodemailer');
require('dotenv').config();

app.use(express.json());
var cors = require('cors');

const transport = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SOME,
        pass: process.env.PAST
    }
}
var transporter = nodemailer.createTransport(transport);

function sendSubscriptionEmail(email) {
    return new Promise(async (resolve, reject) => {

        var mailOptions = {
            from: email?.email,
            to: process.env.TO_EMAIL,
            subject: process.env.CONTACT_US_EMAIL_SUBJECT,
            html: `<p>Hello</p>
            <p>You have received a new subscription email. Have a nice day!</p>
            <p>Cheers,<br>GiveTheNeed</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve({});
            }
        });
    });
}

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

app.post('/globixs/api/contact-us', sendContactUsEmail);
app.post('/globixs/api/hire', sendHireEmail);
app.post('/globixs/api/hiring', sendHiringEmail);

async function sendContactUsEmail(req, res) {
    try {
        var mailOptions = {
            // from: req?.from,
            to: process.env.TO_EMAIL,
            subject: process.env.CONTACT_US_EMAIL_SUBJECT,
            html: `<p>Hello</p>
            <p>You have received a new subscription email. Have a nice day!</p>
            <p>Cheers,<br>GiveTheNeed</p>`
        };

        sendEmail(mailOptions).then((doc) => {
            res.json({ error: false, success: true, message: "Email sent successfully", data: {} })
        }).catch(error => {
            res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
        });
    } catch (error) {
        res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
    }
}

async function sendHireEmail(req, res) {
    try {
        var mailOptions = {
            // from: req?.from,
            to: process.env.TO_EMAIL,
            subject: process.env.CONTACT_US_EMAIL_SUBJECT,
            html: `<p>Hello</p>
            <p>You have received a new subscription email. Have a nice day!</p>
            <p>Cheers,<br>GiveTheNeed</p>`
        };

        sendEmail(mailOptions).then((doc) => {
            res.json({ error: false, success: true, message: "Email sent successfully", data: {} })
        }).catch(error => {
            res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
        });
    } catch (error) {
        res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
    }
}

async function sendHiringEmail(req, res) {
    try {
        var mailOptions = {
            // from: req?.from,
            to: process.env.TO_EMAIL,
            subject: process.env.CONTACT_US_EMAIL_SUBJECT,
            html: `<p>Hello</p>
            <p>You have received a new subscription email. Have a nice day!</p>
            <p>Cheers,<br>GiveTheNeed</p>`
        };

        sendEmail(mailOptions).then((doc) => {
            res.json({ error: false, success: true, message: "Email sent successfully", data: {} })
        }).catch(error => {
            res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
        });
    } catch (error) {
        res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
    }
}

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        try {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Globixs API'
    })
})

app.listen(port, hostname, function () {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});

module.exports = router;
module.exports = app;