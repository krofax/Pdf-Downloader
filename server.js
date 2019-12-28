const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();

//Import Routes
const allRoute = require('./routes/auth');
const pdfRoutes = require('./routes/pdf');
//Connect to DB
let mongoDB = process.env.MONGODB_URI || 'mongodb://speechuser:speech1@ds359118.mlab.com:59118/speecapp'
mongoose.connect(mongoDB,
  { useNewUrlParser: true },
  () => console.log('connected to DB!!'));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes Middleware
app.use('/api', allRoute)
app.use('/pdf', pdfRoutes)
let PORT = process.env.PORT ||8080;
app.listen(PORT, () => console.log('app up and running'));