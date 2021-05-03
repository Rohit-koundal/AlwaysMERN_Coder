//Require field here
const route = require('express').Router();
const nodemailer = require('nodemailer');
const Model = require('../mongodb/model');
const DetailsModel = require('../mongodb/datamodel');
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
              user: 'rohit.iwebcode@gmail.com',
              pass: 'rohitiwebcode',
         },
    secure: true,
});
const {body ,validationResult }=require('express-validator');
//Home API with GET Method
route.get('/',(req,res)=>{
        res.render('index',{message : ""});
});
//End of API with GET Method

//Register API with Post Method 
route.get('/register',(req,res)=>{
    res.render('register',{errors:"" ,type:''})
});

//End of Register API with Post Method

//Login API with GET Method
route.get('/login',(req,res)=>{
    res.render('login',{message:"",details:''})
});

// End of Login API with GET Method

//Password API with POST Method
route.post('/password',(req,res)=>{
    var {UserName,Email,Mobile,Password,rePassword} = req.body;
    if(rePassword !== Password){
        res.render('password',{type:'danger',message:'Password does Match'});
    }
    else if(rePassword === Password){
        var uploadDetails = new DetailsModel({
            UserName:UserName,
            Email:Email,
            Mobile:Mobile,
            Password:Password,
        });
        uploadDetails.save().then(()=>{console.log('Data Saved Successfully');}).catch((err)=>{console.log(err);})
        

    }


});

//End of Password API with GET Method

// Verification API with POST Method
route.post('/verification',(req,res)=>{

    var {otp} = req.body;
    console.log(req.body);
    Model.findOne({RandomNumber:otp},(err,data)=>{
        if(err) throw err
        else{
            console.log(data);
            if(data.RandomNumber !== otp){
                res.render('verification',{details:req.body,message:"Invalid code"});

            }
            else{
                res.render('password',{message:'',details:req.body});
            }
        }
    })
})
// End of Verification API with POST Method

// Register API with Post Method
route.post('/register',
                     body('UserName',"Invalid UserName").isLength({min:4}),
                    body('Email',"Invalid Email").isEmail(),
                    body('Mobile',"Invalid Mobile").isNumeric(),
                    
                (req,res)=>{
                const error = validationResult(req);
                if(!error.isEmpty()){
        
                    res.render('register',{errors:error.array() , type:'danger'});
                    
                }
                else{
                  var {UserName , Email , Mobile} = req.body;
                  const RandomNumber = Math.floor(Math.random()*(9999-1000))+1000;
                  const mailData = {
                    from: 'rohit.iwebcode@gmail.com',  // sender address
                      to: Email,   // list of receivers
                      subject: 'Verification code',
                      text: `Hi
                             ThankuYou Visit Our Website\
                             Here's your verification code is:
                             <h1 style='color : blue ;'>${RandomNumber}</h1> 
                             And the code will expire with in 30 minutes
                             `,
                    };
                    transporter.sendMail(mailData, function (err, info) {
                        if(err)
                          console.log(err)
                        else
                          var otp = new Model({
                              RandomNumber:RandomNumber
                          });
                          otp.save().then(()=>console.log('otp save Successfully')).catch((err)=>console.log(err));
                          res.render('Verification',{details:req.body,message:""});
                        });
                 
                }
          });
//End of Regsiter API with POST Method
module.exports=route;