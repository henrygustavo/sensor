var express = require('express');
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var isActivedSendEmail = "0";

//APP CONFIGURATION
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var apiRouter = express.Router();

apiRouter.route('/sensors')
    .post(function(req, res) {

        isActivedSendEmail = req.body.active;

        console.log("post:"+req.body.active);

          var message = (isActivedSendEmail=="1" ? 'turnOn' : 'turnOff');

        res.json({
            success: true,
            message:message
        });
    });

app.use('/api', apiRouter);

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
  console.log('email:' + isActivedSendEmail);
    if (value && isActivedSendEmail=="1") {
        sendEmail();
    }
});

gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);


app.set('port', 80);

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.listen(app.get('port'));

console.log("here we go");

function sendEmail() {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'XXX@gmail.com', // Your email id
            pass: 'XXX' // Your password
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
