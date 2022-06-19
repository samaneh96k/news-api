const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
    host: "mail.ghorbany.dev",
    port: 465,
    secure: true,
    auth: {
        user: "toplearn@ghorbany.dev",
        pass: "toplearn123456",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const transporter = nodeMailer.createTransport(transporterDetails);

const options = {
    from: "toplearn@ghorbany.dev",
    to: "younes.gh@chmail.ir",
    subject: "Nodemailer Test",
    text: "Simple Test Of Nodemailer",
};

transporter.sendMail(options, (err, info) => {
    if (err) return console.log(err);
    console.log(info);
});
