const nodeMailer = require('nodemailer');

const sendMail = async ( options )=>{
  
    const transporter = await nodeMailer.createTransport({
       service: "gmail",

        secure: true, // true for port 465, false for other ports
        auth: {
          user: "somtourigwe4@gmail.com",
          pass: "bwky wptm wmmf jzpz"
        },
        tls: {
            rejectUnauthorized: false, // Bypass SSL verification
          }        
      });

      const mailOption = {
        subject: options.subject, text:options.text, from:"somtourigwe4@gmail.com", to: options.email, html:options.html
      };
      await transporter.sendMail(mailOption)

}
module.exports = sendMail;