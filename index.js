const express = require('express');
const mongoose = require('mongoose');
const Route = require('./routes/authRoutes');
require('dotenv').config();

const App = express();
const cors = require('cors');
const todoRoute = require('./routes/todoRoute');
App.use(cors())

App.use(express.json());


App.use('/', Route)
App.use('/', todoRoute)



mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        App.listen(4000, () => { console.log('DB Connected and Server started') })
    })
    .catch((err) => {
        console.log(err, 'Mongo db connection error');
    });