import {FormValues} from "./Inputform.tsx";

import {useState, useEffect} from 'react';



const initialURLipinfo="https://ipinfo.io/?token="
const TOKENID="7aafc6aef32e53";
const URLipinfo=initialURLipinfo.concat(TOKENID);



function useAPI(props:FormValues){
    console.log(props);
    console.log("Inside the function");
    console.log(URLipinfo);
    const [latlongOne, setLatLongOne] = useState('');
    const [latlongTwo, setLatLongTwo] = useState('');
    

    const fetchData = async () => {
            try {
                const response = await fetch(URLipinfo);
                const jsonData = await response.json();
                const location=jsonData.loc;
                setLatLongOne(location);
              } catch (error) {
                console.log(error);
              }

    };
    useEffect(() => {
    fetchData();
  }, []);

  const fetchGoogleData = async () => {
    try {
        const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDIOoQ8sIRAi7O9s-xQtWpowOWf9x-zkJQ");
        const jsonData = await response.json();
        const location=jsonData.results[0].geometry.location;
        var lat2:number=location.lat;
        var lng2:number=location.lng;
        var finallat:string=lat2.toString();
        var finallng:string=lng2.toString();
        var finalres:string=finallat+","+finallng;
        console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
        console.log(finalres);


        setLatLongTwo(finalres);
      } catch (error) {
        console.log(error);
      }

};
    useEffect(() => {
    fetchGoogleData();
    }, []);
    
   if(props.checkBox){
    return [latlongOne];
   }



 return [latlongTwo];
  
}

export default useAPI;

