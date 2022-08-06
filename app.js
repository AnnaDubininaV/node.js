const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

// define existing models
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// relate models (user that created a product)
// second arg - how this relation should be managed
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
