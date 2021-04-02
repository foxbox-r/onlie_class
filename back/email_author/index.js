const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports = smtpTransport;