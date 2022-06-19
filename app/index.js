const express = require('express');
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
var bodyParser = require('body-parser')
const dotEnv = require("dotenv");
const {errorHandler} = require('./http/middleware/Error');
const api = require('./routes/api');
const {setHeaders}=require('./http/middleware/headers');

const app = express();
//* Load Config
dotEnv.config({ path: "../config/config.env" });
class Application {
  constructor() {
    this.setupExpressServer();
    this.setupMongoose();
    this.setupRoutesAndMiddlewares();
    this.setupConfigs();
  }

  setupRoutesAndMiddlewares() {
    //──── Static Folder
    app.use(express.static('uploads'));
    // built-in middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

  
    if (app.get('env') === 'production') app.use(morgan('tiny'));

    // third-party middleware
    app.use(cors());

    app.use(setHeaders);
    //routes
app.use("/api" , api)
    
    /// ...

    app.use(errorHandler);
    
  }

  setupConfigs() {
    winston.add(new winston.transports.File({ filename: 'error-log.log' }));
    winston.add(
      new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/toplearn',
        level: 'error',
      }),
    );

    process.on('uncaughtException', (err) => {
      console.log(err);
      winston.error(err.message);
    });
    process.on('unhandledRejection', (err) => {
      console.log(err);
      winston.error(err.message);
    });

    // app.set('view engine', 'pug');
    // app.set('views', '../views'); // default
  }

  setupMongoose() {
    mongoose
      .connect('mongodb://localhost:27017/myCms', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('db connected');
        winston.info('db connected');
      })
      .catch((err) => {
        console.error('db not connected', err);
      });
  }
  setupExpressServer() {
    const port = process.env.myPort || 3002;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}

module.exports = Application;
