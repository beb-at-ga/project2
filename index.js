require('dotenv').config();

const express = require('express');
const layouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('./config/passportConfig');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const sessionPool = require('pg').Pool
// const uuid = require('uuid/v4');
const fs = require("fs");
const pgConfig = JSON.parse(fs.readFileSync('./config/config.json'));
const helmet = require('helmet');

const app = express();
app.use(helmet());


// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// app.set('socketio', io);


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
app.use('/routes', require('./controllers/routes'));
app.use('/routes2', require('./controllers/routes2'));


// app.get('/socket.io', (req, res) => {
//   // let io = req.app.get('socketio');
//   // io.emit('hi!');  

//   io.on('connection', (socket) => {
//     console.log('A client has connected.');

//     socket.on("chat message", (msg) => {
//       console.log(msg)
//       io.emit('chat message', msg);
//     });

//     socket.on("disconnect", () => {
//       console.log('A client has disconnected.');
//     });

//   });
// })



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





// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const express = require('express');
// const app = express();

// const http = require('http').Server(app);
// const io = require('socket.io')(http);


// app.use('/', express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// })

// io.on('connection', (socket) => {
//   console.log('A client has connected.');

//   socket.on("chat message", (msg) => {
//     console.log(msg)
//     io.emit('chat message', msg);
//   });

//   socket.on("disconnect", () => {
//     console.log('A client has disconnected.');
//   });


// });



// http.listen(3001, () => {
//   console.log('http listening on port 3001');
// });

// //allow socket IO to latch onto HTTP server
// var server = http.createServer(NYise);
// var io = require('socket.io').listen(server);

// //reacts to an event emitted on the client side 
// io.on('connection', function(socket){
//      socket.on('coords', function(yourDataPassed){
//           //whatever you intened to do with your data
//      });
// });
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~