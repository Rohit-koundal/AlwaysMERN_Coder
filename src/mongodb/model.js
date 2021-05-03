const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Reactdetails',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    
}).then(()=>{
    console.log('Connection Successfully : mongodb://localhost.27017');
}).catch((err)=>{
    console.log(err);
})

const schema = new mongoose.Schema({
    RandomNumber : {
        type:String,
        required:true
    }
});

const Model = new mongoose.model('OTP',schema);
module.exports =Model;