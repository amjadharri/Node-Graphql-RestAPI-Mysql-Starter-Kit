let nodemailer = require('nodemailer');

const {
  MAILER_SERVICE,
  MAILER_SERVICE_USERNAME,
  MAILER_SERVICE_PASSWORD
} = process.env;

let transporter = nodemailer.createTransport({
  service: MAILER_SERVICE,
  auth: {
    user: MAILER_SERVICE_USERNAME,
    pass: MAILER_SERVICE_PASSWORD
  }
});

export default transporter;