const express = require('express');


const app = express();


app.get('/', (req, res) => {
  res.send('<h1>Hellloooo</h1>');
})

////////////////////////////////////////////


app.listen(3000, () => {
  console.log(`Express is listening on port 3000.`)
})