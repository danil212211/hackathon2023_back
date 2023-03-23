const config = require("../config/index");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport(config.mailer);
async function sendMessage(req) {
  return await transporter.sendMail({
    from: "14-bit devTeam <danil.zelenskiy.2005@mail.ru>",
    to: req?.to,
    subject: req?.subject,
    text: req?.text,
  });
}
module.exports = {
  sendMessage,
};
