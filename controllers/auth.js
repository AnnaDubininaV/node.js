const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {
  MAILTRAP_HOST,
  MAILTRAP_PASS,
  MAILTRAP_PORT,
  MAILTRAP_USER,
} = require('../utils/databaseConfig');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true';
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash('error')?.[0],
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: req.flash('error')?.[0],
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid emai or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          return res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('login');
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error', 'E-mail is already in use!');
        return res.redirect('/signup');
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/login');
          return transporter
            .sendMail({
              to: email,
              from: 'shop@node-complete.com',
              subject: 'Signup succeeded!',
              html: '<h1>You successfuly signed up!</h1>',
            })
            .catch((err) => console.log(err));
        });
    })

    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
