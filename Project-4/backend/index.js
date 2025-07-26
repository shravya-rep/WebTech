const express = require('express');
const mongoose =require('mongoose');
const app = express();
app.use(express.static('react-typescript/dist'));


const cors=require("cors");
const corsOption={
    origin:["http://localhost:5173"],
};
app.use(cors(corsOption));



app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// define the route


async function connectDB(){
  const conn= mongoose.connect("mongodb+srv://shravya2490:NdZ0CSrGmwn0KWba@cluster0.3xllu.mongodb.net/HW3?retryWrites=true&w=majority&appName=Cluster0").then(result=>console.log("MongoDB Connected")).catch(error=>console.log(error));


}
connectDB();
const myschema=new mongoose.Schema({latlongval:'string',city:'string',state:'string'});
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
  console.log("inside store data");
  console.log(req.query.latlongval);
  console.log(req.query.city);
  console.log(req.query.state);
  res.json({"data":"recived"});
  const result=await favModel.create({latlongval:req.query.latlongval,city:req.query.city,state:req.query.state});

  
});

app.get('/loaddata',async(req,res)=>{
  console.log('Inside loaddata');
  const result2=await favModel.find().exec();
  //const resultJSON=JSON.stringify(result2);
  //console.log(resultJSON);
  res.json(result2);


});

app.get('/deletedata',async(req,res)=>{
  console.log('Inside deletedata');
  console.log(req.query._id);
  const result2=await favModel.deleteOne({_id:req.query._id});
  console.log(result2);
  res.json(result2);



});

app.get('/loadacity',async(req,res)=>{
  console.log('Inside loadacity');
  console.log(req.query._id);
  const result2=await favModel.find({_id:req.query._id}).exec();
  res.json(result2);


});

app.get('/autocomplete',async(req,res)=>{
  const APIKEY = "AIzaSyDIOoQ8sIRAi7O9s-xQtWpowOWf9x-zkJQ";
  console.log(req.query.cityval);
  const cityInput=req.query.cityval;
  const URLCity="https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+cityInput+"&types=%28cities%29"+"&key=AIzaSyDIOoQ8sIRAi7O9s-xQtWpowOWf9x-zkJQ";
  console.log(URLCity);
  const responseCity=await fetch(URLCity);
  const resp3=await responseCity.json();
  console.log(resp3);
  res.json(resp3);
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
    const URL4="&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timezone=America/Los_Angeles&timesteps=1d,1h&apikey=YhMYPJvwec6Tr6Rh9fwmo0Sw0wVjwenE";
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