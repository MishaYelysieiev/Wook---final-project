const nodemailer = require('nodemailer');
require('dotenv').config()

exports.send =  async (req, res) => {
    //connect semd email package

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.GMAIL_USER,
           pass: process.env.GMAIL_PASSWORD
       }
   });

   const mailOptions = {
    from: process.env.GMAIL_USER, // sender address
    to: req.body.email, // list of receivers
    subject: 'Wook store. Subscribe', // Subject line
    html: "<p style='margin: 1em 0px;'> We really appreciate that you test our educational project.</br> For now, we don't have any news and updates. But you will be first who will know about its implementation</p></br>Thank you and have a nice day :)" // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
 res.status(200).send('Email have succesfully sended')
};