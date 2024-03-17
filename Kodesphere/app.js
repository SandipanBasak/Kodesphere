const express=require('express');
 const mongoose=require('mongoose');
const app=express();
const port=3000;
app.use(express.json());

mongoose.connect('mongodb+srv://rssmp120:rohan3046@cluster0.nsofrmr.mongodb.net/Kodespehere');

const devices=mongoose.model('devices',{
    teamid:String,
    device:String,
    value:Number
});


app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})