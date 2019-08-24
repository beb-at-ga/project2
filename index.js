const express = require('express');
const router = express.Router();

const app = express();

app.use((req,res,next) => {
  console.log('/' + req.method);
  next();
});

app.get('/', (req,res) => {
  res.send(`<h1>Hellllloooo</h1><hr/>`);
});


////////////////////////////////////////////

app.listen(3000, () => {
  console.log(`Express is listening on port 3000.`)
})