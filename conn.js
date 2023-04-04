const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app=require('./app')
dotenv.config( {path: './config.env'} );
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false 
}).then(() => {
    console.log('connection Successfull');
}).catch(() => console.log('No connection'));

