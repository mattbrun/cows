'use strict';

// #############################################################################
// Dependencies
// #############################################################################

var nodemailer = require('nodemailer');



// #############################################################################
// Init
// #############################################################################

var mailTransporter = nodemailer.createTransport();



// #############################################################################
// Routes
// #############################################################################

module.exports.sendEmail = function (req, resp, next) {
  var email = req.body;
  
  console.log('### email', email);
  mailTransporter.sendMail(email, function (err, info) {
    if (err) { return next(err); }
    console.log('Message sent:', info);
  });
};
