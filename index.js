require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('./config/passportConfig');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const sessionPool = require('pg').Pool
const fs = require("fs");
const pgConfig = JSON.parse(fs.readFileSync('./config/config.json'));
const helmet = require('helmet');

const app = express();
app.use(helmet());

const sessionConfig = {
  store: new pgSession({
    pool: new sessionPool({
      user: pgConfig.development.username,
      password: pgConfig.development.password,
      host: pgConfig.development.host,
      port: 5432,
      database: pgConfig.development.database
    }),
    tableName: 'session'
  }),
  name: 'SID',
  secret: process.env.SESSION_SECRET,
  // secret: uuid(),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    aameSite: true,
    secure: false // ENABLE ONLY ON HTTPS
  }
}

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(layouts);
app.use('/', express.static('public'));
app.use(express.urlencoded({
  extended: false
}));

app.use(session(sessionConfig))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.customer = req.user;
  // res.locals.moment = moment;
  next();
})

////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.render(`index`);
});

app.use('/auth', require('./controllers/auth'));
app.use('/preferences', require('./controllers/preferences'));
app.use('/routes', require('./controllers/routes'));
app.use('/plans', require('./controllers/plans'));

app.get('*', (req, res) => {
  res.sendFile('views/error/custom_error.html');
})

////////////////////////////////////////////////
try {
  app.listen(process.env.PORT, (err) => {
    console.log(`Express is listening on port ${process.env.PORT}.`)
  })
} catch (err) {
  console.log(`~~~~~~~ Error starting express: ${err}`);
}
