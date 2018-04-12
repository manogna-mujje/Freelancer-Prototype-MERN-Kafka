var nodemailer = require('nodemailer');

function sendEmail(toEmailID, project, freelancer) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'freelancer.replica@gmail.com',
          pass: 'gmail@2018'
        }
      });
      
      var mailOptions = {
        from: 'freelancer.replica@gmail.com',
        to: toEmailID, 
        subject: 'Freelancer: You\'re hired for new Project!',
        text: 'Hi ' + freelancer +
        ',\n\nCongratulations! You have been hired for the project - ' + project + '.\nPlease contact the employer immediately.\n\nCheers,\nFreelancer Team'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

exports.sendEmail = sendEmail;