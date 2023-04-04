const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    File:{
        type: String,
        require: true
    },
    Auth: {
        type: String,
        require: true
    },
    Loc: {
        type: String,
        require: true
    },
    Desc: {
        type: String,
        require: true
    },
    like:{
        type:Number,
        require:true
    },
    fulldate:{
        type:String,
        require:true
    }
})



const User = mongoose.model('USER', userSchema);
module.exports = User;