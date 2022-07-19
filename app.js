const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express();

//FOR HANDLEBARS

// app.engine(
//   'hbs',
//   engine({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     // extantion name Just for layout file, we need to set it in case it is different from .handlebars
//     extname: 'hbs',
//   })
// );
// app.set('view engine', 'hbs');

//FOR PUG

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const admineData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admineData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
  res.status(404).render('404', { pageTitle: 'Not Found', layout: false });
});

app.listen(3000);
