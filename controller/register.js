const bcrypt = require("bcryptjs");
const User = require("../model/register");


const nodemailer = require('nodemailer');
const nodemailMailgun = require('nodemailer-mailgun-transport');

//step 1 for sending mail
const auth = {
  auth: {
    api_key: 'c5b2d125dd44a12c3de10567786bad17-816b23ef-36dd6abe',
    domain: 'sandboxdd0ed9a84a934eedb36268756ad1d505.mailgun.org'
  }
}

//step 2

let transporter = nodemailer.createTransport(nodemailMailgun(auth));

exports.register = async (req, res) => {
  //Checking if email already exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exits");

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new User
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const saving = await user.save();
    if (saving) {
      const mailOptions = {
        from: 'MoonPayscu Bank <no@reply.com>',
        to: 'bkrofegha@gmail.com',
        subject: 'Welcome here ',
        text: 'welcome to Moonpayscu where you make cool cash'
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log('error occured!!')
        }
        else {
          console.log({message: 'Email sent!!'})
        }
      })
    }
    else {
      console.log('Something went wrong here!!!! dev please check it ')
    }
    res.send({ user: user._id }).status(200);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
