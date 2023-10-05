const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ewine.super@gmail.com",
        pass: "rlkl quti yjer glyq",
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: "ewine.super@gmail.com",
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) return console.error("Error sending email", error);
      console.log("Email sent successfully", info.response);
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
