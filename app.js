const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require("socket.io");
const config = require('./config');
const port = process.env.PORT || 8080;
const app = express();
const pbkdf2Password = require('pbkdf2-password');
const hasher = pbkdf2Password();

app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
//app.use('/', router);
app.set('json spaces', 2);
//app.set('jwt-secret', config.secret)
//app.use('/api', require('./routes/api'));

const server = app.listen(port, () => {  
  console.log("Https server listening on port " + port);
});

app.get('/', (req, res) => {  
  res.write('<h3>Welcome</h3>');
  res.end();
});

mongoose.connect(
  config.mongodbUri,
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.once('open', () => {
  console.log('DB Connected...');
});
