const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',require('./src/Router/routre'));
app.use(express.static('./view'));
app.set('view engine','ejs');
app.set('views','view');

app.listen(port,(err)=>{
    if(err) throw err;
    else{
        console.log(`Server on : https://localhost:${port}`);
    }
})

