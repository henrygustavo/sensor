var express = require('express');
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var nodemailer = require('nodemailer');

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);

    if (value) {
        sendEmail();
    }
});

gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname) + '/index.html');
});

app.set('port', (80));

app.listen(app.get('port'));

console.log("here we go");

function sendEmail() {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'henrygustavof@gmail.com', // Your email id
            pass: 'henry_06' // Your password
        }
    });
        // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'henrygustavof@gmail.com', // sender address
        to: 'henrygustavof@gmail.com', // list of receivers
        subject: 'Intruso', // Subject line
        text: 'se detectó movimiento', // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

}
