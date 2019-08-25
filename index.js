require('dotenv').config();

const express = require('express');
const layouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('./config/passportConfig');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(layouts);
app.use('/', express.static('public'));
app.use(express.urlencoded({
  extended: false
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.customer = req.user; //passport provides user to the req. must be below passport.
  // res.locals.moment = moment;
  next();
})


// app.use((req, res, next) => {
//   console.log('/' + req.method);
//   next();
// });

////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.render(`index`);
});

app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));

app.get('*', (req, res) => {
  res.send(`I dunno. 404 or something?`);
})

////////////////////////////////////////////////
try {
  app.listen(process.env.PORT, (err) => {
    console.log(`Express is listening on port ${process.env.PORT}.`)
  })
} catch (err) {
  console.log(`~~~~~~~ Error starting express: ${err}`);
}