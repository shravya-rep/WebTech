require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require("cors");
const corsOption = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || true
        : ["http://localhost:5173"],
};
app.use(cors(corsOption));

app.get('/', (req, res) => {
  res.send('Weather App Backend is running.');
});

// define the route


async function connectDB(){
  await mongoose.connect(process.env.MONGODB_URI).then(result=>console.log("MongoDB Connected")).catch(error=>console.log(error));
}
connectDB();
const myschema=new mongoose.Schema({latlongval:String,city:String,state:String});
const favModel= mongoose.model('Favorite',myschema);









/*
async function connectDB (){
  try {
    const conn=await mongoose.connect("mongodb+srv://shravya2490:NdZ0CSrGmwn0KWba@cluster0.3xllu.mongodb.net/HW3?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDb Connected");
    const myschema=conn.Schema({street:'string',city:'string',region:'string'});
    const favModel=conn.model('Favorite',myschema);
    return favModel;
    console.log(favModel);
    console.log(favModel);
    const result=await favModel.create({street:'ABC',city:'Blue',region:'Washing'});
    const found=await favModel.findOne({city:'Blue'}).exec();
    console.log(found);
    
  }
  catch(error){
      console.log(error);
  }
}
*/

app.get('/storedata',async(req,res)=>{
  try {
    const existing = await favModel.findOne({latlongval:req.query.latlongval});
    if(existing){
      return res.json({"data":"exists","_id":existing._id});
    }
    const result=await favModel.create({latlongval:req.query.latlongval,city:req.query.city,state:req.query.state});
    res.json({"data":"received","_id":result._id});
  } catch(error) {
    console.log(error);
    res.status(500).json({"error":"Failed to store data"});
  }
});

app.get('/loaddata',async(req,res)=>{
  try {
    console.log('Inside loaddata');
    const result2=await favModel.find().exec();
    res.json(result2);
  } catch(error) {
    console.log(error);
    res.status(500).json({"error":"Failed to load data"});
  }
});

app.get('/deletedata',async(req,res)=>{
  try {
    console.log('Inside deletedata');
    const result2=await favModel.deleteOne({_id:req.query._id});
    res.json(result2);
  } catch(error) {
    console.log(error);
    res.status(500).json({"error":"Failed to delete data"});
  }
});

app.get('/loadacity',async(req,res)=>{
  try {
    console.log('Inside loadacity');
    const result2=await favModel.find({_id:req.query._id}).exec();
    res.json(result2);
  } catch(error) {
    console.log(error);
    res.status(500).json({"error":"Failed to load city"});
  }
});

app.get('/autocomplete',async(req,res)=>{
  try {
    const cityInput=req.query.cityval;
    const URLCity="https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+cityInput+"&types=%28cities%29"+"&key="+process.env.GOOGLE_API_KEY;
    const responseCity=await fetch(URLCity);
    const resp3=await responseCity.json();
    res.json(resp3);
  } catch(error) {
    console.log(error);
    res.status(500).json({"error":"Autocomplete failed"});
  }
});



app.get('/processdata', async(req, res) => {

    console.log(req.query.lat);
    console.log(req.query.long);
    const latitude=req.query.lat;
    console.log(latitude);
    const longitude=req.query.long;
    console.log(longitude);
    const URL1="https://api.tomorrow.io/v4/timelines?location="
    const URL2=latitude;
    const URL3=","+longitude;
    const URL4="&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timezone=America/Los_Angeles&timesteps=1d,1h&apikey="+process.env.TOMORROW_API_KEY;
    const finalURL=URL1+URL2+URL3+URL4;
    console.log(finalURL);

    const trial= await fetch(finalURL);
    const resp2=await trial.json();
    res.json(resp2);


    /*

    console.log(req.query.lat);
    console.log(req.query.long);
    const latitude=req.query.lat;
    console.log(latitude);
    const longitude=req.query.long;
    console.log(longitude);
   
  */
      });

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});