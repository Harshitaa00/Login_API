const express = require('express');
const app = express();
const userRoute = require('./api/routes/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



mongoose.connect('mongodb+srv://harsha:harsha@cluster0.0jprd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>{
    console.log('connection failed');
});
mongoose.connection.on('connected',connected=>{
    console.log('connected with database.. ');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',userRoute);

/*app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    });
});
*/
app.use((req,res)=>{
    res.status(200).json({
        message:'app is running..'
    })
    
})


module.exports = app;
