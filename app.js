const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const { CLUSTER_NAME, USER_NAME, PASSWORD } = require('./utils/databaseConfig');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// registers a middleware function for incoming requests
app.use((req, res, next) => {
  User.findById('62f6894447e5e5e94c1311e9')
    .then(({ name, email, cart, _id }) => {
      req.user = new User(name, email, cart, _id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

const connectionUrl = `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_NAME}.aonfkqn.mongodb.net/shop?retryWrites=true&w=majority`;

mongoose
  .connect(connectionUrl)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
