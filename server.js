const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require("path")


//from the items api
const items = require('./routes/api/items')

const app = express()


//Initialize Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Db config
const db = require('./config/keys').mongoURI

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected....'))
    .catch(err => console.log(err))

//set a static folder if we want to serve multiple html pages, & files like css/js
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// app.use('/public' , express.static('public'));

//use routes
//anything that goes to api/items should refer to items file
app.use('/', items)




const port = process.env.port || 5000
app.listen(port, () => console.log(`server started on port ${port}`))

