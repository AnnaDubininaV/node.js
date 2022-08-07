const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

// define existing models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// registers a middleware function for incoming requests
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // at this point user is sequelized object with all sequelise methodth in it
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

// relate models (user that created a product)
// second arg - how this relation should be managed
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
// will add a foreingKey, new field userId to the cart
Cart.belongsTo(User);
// n:m relationship (one cart can hold multiple products)
Cart.belongsToMany(Product, { through: CartItem });
// n:m (single product can be added to multiple cars)
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// npm start - runs the following lines
sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    // if !user we create dummy user
    if (!user) {
      User.create({ name: 'Ana', email: 'test@test,com' });
    }
    return user;
  })
  .then((user) => {
    user.getCart().then((cart) => {
      if (!cart) {
        user.createCart();
      }
      return cart;
    });
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
