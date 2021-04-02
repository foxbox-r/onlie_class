const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "foxboxr@gmail.com",
        pass: "rsua#001"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports = smtpTransport;