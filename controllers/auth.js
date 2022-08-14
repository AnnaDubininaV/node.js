const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true';
  console.log(req.session.isLoggedIn, '~~~~~~~~~~~~');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  // an example of setting cookies
  // res.setHeader('Set-Cookie', 'loggedIn=true');
  User.findById('62f80b8d97397b9bdb8c29f2')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};
