const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    UserName :{
        type:String
    },
    Email:{
        type:String
    },
    Mobile:{
        type:String
    },
    Password:{
        type:String
    }
},
{
    timestamps:true
});

const Model = new mongoose.model('DataDetails',schema);
module.exports =Model;