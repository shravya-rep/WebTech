
var sending;
var address;
const weather = {
    "1000": ["Clear,Sunny", "Images/Weather Symbols for Weather Codes/clear_day.svg"],
    "1100": ["Mostly Clear", "Images/Weather Symbols for Weather Codes/mostly_clear_day.svg"],
    "1101": ["Partly Cloudy", "Images/Weather Symbols for Weather Codes/partly_cloudy_day.svg"],
    "1102": ["Mostly Cloudy", "Images/Weather Symbols for Weather Codes/mostly_cloudy.svg"],
    "1001": ["Cloudy", "Images/Weather Symbols for Weather Codes/cloudy.svg"],
    "2000": ["Fog", "Images/Weather Symbols for Weather Codes/fog.svg"],
    "2100": ["Light Fog", "Images/Weather Symbols for Weather Codes/fog_light.svg"],
    "8000": ["Thunderstorm", "Images/Weather Symbols for Weather Codes/tstorm.svg"],
    "5001": ["Flurries", "Images/Weather Symbols for Weather Codes/flurries.svg"],
    "5100": ["Light Snow", "Images/Weather Symbols for Weather Codes/snow_light.svg"],
    "5000": ["Snow", "Images/Weather Symbols for Weather Codes/snow.svg"],
    "5101": ["Heavy Snow", "Images/Weather Symbols for Weather Codes/snow_heavy.svg"],
    "7102": ["Light Ice Pellets", "Images/Weather Symbols for Weather Codes/ice_pellets_light.svg"],
    "7000": ["Ice Pellets", "Images/Weather Symbols for Weather Codes/ice_pellets.svg"],
    "7101": ["Heavy Ice Pellets", "Images/Weather Symbols for Weather Codes/ice_pellets_heavy.svg"],
    "4000": ["Drizzle", "Images/Weather Symbols for Weather Codes/drizzle.svg"],
    "6000": ["Freezing Drizzle", "Images/Weather Symbols for Weather Codes/freezing_drizzle.svg"],
    "6200": ["Light Freezing Rain", "Images/Weather Symbols for Weather Codes/freezing_rain_light.svg"],
    "6001": ["Freezing Rain", "Images/Weather Symbols for Weather Codes/freezing_rain.svg"],
    "6201": ["Heavy Freexing Rain", "Images/Weather Symbols for Weather Codes/freezing_rain_heavy.svg"],
    "4200": ["Light Rain", "Images/Weather Symbols for Weather Codes/rain_light.svg"],
    "4001": ["Rain", "Images/Weather Symbols for Weather Codes/rain.svg"],
    "4201": ["Heavy Rain", "Images/Weather Symbols for Weather Codes/rain_heavy.svg"]
};
var ppttype={"0":"N/A","1":"Rain","2":"Snow","3":"Freezing Rain","4":"Ice Pellets"};


//const obj = JSON.parse(weather);
var valObj;



function clearandgetdata(){
    console.log("Enteredddddddd clear and get data");
    console.log(document.getElementById('street').value);
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('street').disabled = true;
    document.getElementById('city').disabled = true;
    document.getElementById('state').disabled = true;

}


async function getdata() {
    console.log("Entering");
    const initialURLipinfo="https://ipinfo.io/?token="
    const TOKENID="7aafc6aef32e53";
    const URLipinfo=initialURLipinfo.concat(TOKENID);
    console.log(URLipinfo);
    try{
        const response2 = await fetch(URLipinfo);
        const finalres2 =  await response2.json();
        console.log(finalres2);
        address=finalres2.city+", "+finalres2.region+", "+finalres2.country;
        console.log(address);
        const location=finalres2.loc;
        console.log(location);
        console.log(typeof (location));
        var values=location.split(",");
        var obj = new Object();
        obj.lat=parseFloat(values[0]);
        obj.lng=parseFloat(values[1]);
        console.log(obj);
        const sending2= JSON.stringify(obj);
        console.log(sending2);
        sending=sending2;
        console.log(sending);
        console.log(typeof (sending));

        const urlpart1="/processdata?";
        const urlpart2="lat=";
        const urlpart3=values[0];
        const urlpart4="&lng=";
        const urlpart5=values[1];
        const urlToBeSent=urlpart1.concat(urlpart2,urlpart3,urlpart4,urlpart5);
        console.log(urlToBeSent);
        const r = await fetch(urlToBeSent);
        console.log("check hereeeeeeeeeeeee");
        console.log(typeof (r));
        const f = await r.json();
        console.log(f);
        valObj=f;
        invokeaftersucess();
    }
    catch(error){
        console.log(error);
    }

}

function clearall(){
        console.log("entered clear all ");
        document.getElementById('street').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
        document.getElementById('street').disabled = false;
        document.getElementById('city').disabled = false;
        document.getElementById('state').disabled = false;
        document.getElementById("check").checked = false;
        document.getElementById("myform").reset();
        document.getElementById("output").style.display="none";
        document.getElementById("tableoutput").style.display="none";
        document.getElementById("WeatherDet").style.display="none";
        document.getElementById("containerFirst").style.display="none";
        document.getElementById("container").style.display="none";
        document.getElementById("bkgrnd").setAttribute("style","height:800px");
        if(document.getElementById("errorDisp")!=null){
            document.getElementById("errorDisp").style.display="none";
        }




}

function validateFunc(){
    console.log("entered validatefunc");
    if(check.checked==1)
    {
        getdata();
    }
    else{
        /*
        if(document.getElementById('street').value !=''&&document.getElementById('city').value != ''&&document.getElementById('state').value != '')
        {
            validateformandgetdata();
        }*/
        document.getElementById('street').required=true;
        document.getElementById('city').required=true;
        document.getElementById('state').required=true;

        if(!document.getElementById('street').checkValidity())
        {
            document.getElementById('street').reportValidity();
        }
        if(document.getElementById('street').checkValidity()){
            if(!document.getElementById('city').checkValidity()){
                document.getElementById('city').reportValidity();
            }
        }
        if(document.getElementById('street').checkValidity()&&document.getElementById('city').checkValidity()){
            if(!document.getElementById('state').checkValidity()){
                document.getElementById('state').reportValidity();
            }
        }

        if(document.getElementById('state').checkValidity()&&document.getElementById('city').checkValidity()&&document.getElementById('state').checkValidity()){
            validateformandgetdata();
        }







    }

}

async function validateformandgetdata(){

        var inputSt = document.getElementById("street").value;
        inputSt = inputSt.replaceAll(" ", "+");
        const inputStreet = inputSt;
        console.log(inputStreet);
        const inputCity = document.getElementById("city").value;
        console.log(inputCity);
        const inputState = document.getElementById("state").value;
        console.log(inputState);
    
        const initialURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        const URL = initialURL.concat(inputStreet, "+", inputCity, "+", inputState, "&key=", APIKEY);
        console.log(URL);

        try {
            //const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDzNCqNxFkPrOpJGTg0kuh0mZ8r7SHWIDE")
            //console.log(response);
            const response = await fetch(URL);
            const finalres = await response.json();
            address = finalres.results[0].formatted_address;
            console.log(address);
            console.log(finalres.results[0].geometry.location);
            const finaldata = finalres.results[0].geometry.location;
            console.log(typeof (finaldata));
            const sending1 = JSON.stringify(finaldata);
            sending = sending1;
            console.log(sending1);
            console.log(typeof (sending1));
            const latitude = finalres.results[0].geometry.location.lat;
            console.log(latitude);
            const longitute = finalres.results[0].geometry.location.lng;
            console.log(longitute);

            const urlpart1="/processdata?";
            const urlpart2="lat=";
            const urlpart3=latitude;
            const urlpart4="&lng=";
            const urlpart5=longitute;
            const urlToBeSent=urlpart1.concat(urlpart2,urlpart3,urlpart4,urlpart5);
            console.log(urlToBeSent);
            const r = await fetch(urlToBeSent);
            const f = await r.json();
            console.log(f);
            valObj=f;
            invokeaftersucess();
        } catch (error) {
            console.log(error);
            var emsg=document.createElement("div");
            emsg.setAttribute("id","errorDisp");
            emsg.textContent="No records have been found";
            const mainpage = document.getElementById("inputbox");
            mainpage.appendChild(emsg);


        }


}


const valuesToUse=valObj;


function invokeaftersucess(){
    var elem=document.getElementById("output");
    var foo = window.getComputedStyle(elem, null);
    if (foo.getPropertyValue("display") == 'none') {
        elem.style.display = 'block';
    }

    var elem2=document.getElementById("tableoutput");
    var foo2 = window.getComputedStyle(elem2, null);
    if (foo2.getPropertyValue("display") == 'none') {
        elem2.style.display = 'block';
    }

    document.getElementById("bkgrnd").setAttribute("style","height:1700px");
    //elem.innerHTML= address;
    //const nAddress=address.replace(/\s+/g, ' ');
    //document.getElementById("output").style.display="block";
    document.getElementById("address").innerHTML=address;

    const weatherCode=valObj.data.timelines[0].intervals[0].values.weatherCode;
    const strWC=weatherCode.toString();

    const x=weather[strWC][1];
    console.log(typeof (x));
    var toCheck=document.getElementById("imageonly").childElementCount;
    if(toCheck==0){
        var imgToDisp = document.createElement("img");
        imgToDisp.setAttribute("src", x);
        imgToDisp.setAttribute("width", "120");
        imgToDisp.setAttribute("height", "120");
        document.getElementById("imageonly").appendChild(imgToDisp);
    }

    document.getElementById("desc").innerHTML=weather[strWC][0];
    //console.log(typeof (valObj.data.timelines[0].intervals[0].values.weatherCode));
    var tmp=valObj.data.timelines[0].intervals[0].values.temperature;
    const tp=tmp.toString();
    document.getElementById("temp").innerHTML=tp.concat("&deg");

    var toCheck1=document.getElementById("hum").childElementCount;
    if(toCheck1==0){
        var humImg=document.createElement("img");
        humImg.setAttribute("src", "Images/humidity.png");
        humImg.setAttribute("width", "30");
        humImg.setAttribute("height", "30");
        document.getElementById("hum").appendChild(humImg);
    }

    let num=valObj.data.timelines[0].intervals[0].values.humidity;
    let val=num.toString();
    const humVal=val.concat("%");
    document.getElementById("humval").innerHTML=humVal;
    document.getElementById("humidity").innerHTML="Humidity";

    var toCheck2=document.getElementById("pres").childElementCount;
    if(toCheck2==0){
        var pressImg=document.createElement("img");
        pressImg.setAttribute("src", "Images/Pressure.png");
        pressImg.setAttribute("width", "30");
        pressImg.setAttribute("height", "30");
        document.getElementById("pres").appendChild(pressImg);
    }

    let pnum=valObj.data.timelines[0].intervals[0].values.pressureSeaLevel;
    let pval=pnum.toString();
    const presVal=pval.concat("inHg");
    document.getElementById("presval").innerHTML=presVal;
    document.getElementById("pressure").innerHTML="Pressure";

    var toCheck3=document.getElementById("wind").childElementCount;
    if(toCheck3==0) {
        var windImg = document.createElement("img");
        windImg.setAttribute("src", "Images/Wind_Speed.png");
        windImg.setAttribute("width", "30");
        windImg.setAttribute("height", "30");
        document.getElementById("wind").appendChild(windImg);
    }


    let wnum=valObj.data.timelines[0].intervals[0].values.windSpeed;
    let wval=wnum.toString();
    const windVal=wval.concat("mph");
    document.getElementById("windval").innerHTML=windVal;
    document.getElementById("windspeed").innerHTML="Wind Speed";

    var toCheck4=document.getElementById("vis").childElementCount;
    if(toCheck4==0) {
        var visImg = document.createElement("img");
        visImg.setAttribute("src", "Images/Visibility.png");
        visImg.setAttribute("width", "30");
        visImg.setAttribute("height", "30");
        document.getElementById("vis").appendChild(visImg);
    }

    let vnum=valObj.data.timelines[0].intervals[0].values.visibility;
    let vval=vnum.toString();
    const visVal=vval.concat("mi");
    document.getElementById("visval").innerHTML=visVal;
    document.getElementById("visibility").innerHTML="Visibility";

    var toCheck5=document.getElementById("cloud").childElementCount;
    if(toCheck5==0) {
        var ccImg = document.createElement("img");
        ccImg.setAttribute("src", "Images/Cloud_Cover.png");
        ccImg.setAttribute("width", "30");
        ccImg.setAttribute("height", "30");
        document.getElementById("cloud").appendChild(ccImg);
    }


    let ccnum=valObj.data.timelines[0].intervals[0].values.cloudCover;
    let ccval=ccnum.toString();
    const cloudVal=ccval.concat("%");
    document.getElementById("cloudval").innerHTML=cloudVal;
    document.getElementById("cloudcover").innerHTML="Cloud Cover";

    var toCheck6=document.getElementById("uv").childElementCount;
    if(toCheck6==0) {
        var uvImg = document.createElement("img");
        uvImg.setAttribute("src", "Images/UV_Level.png");
        uvImg.setAttribute("width", "30");
        uvImg.setAttribute("height", "30");
        document.getElementById("uv").appendChild(uvImg);
    }

    let uvnum=valObj.data.timelines[0].intervals[0].values.uvIndex;
    const uvval=uvnum.toString();
    document.getElementById("uvval").innerHTML=cloudVal;
    document.getElementById("uvdisp").innerHTML="UV Level";


    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const finalDate=[];

    for(ndays=0;ndays<6;ndays++){
        const d = new Date(valObj.data.timelines[0].intervals[ndays].startTime);
        let dt=d.getDate();
        let dayt = day[d.getDay()];
        let year=d.getFullYear();
        let monthval = month[d.getMonth()];
        finalDate[ndays]=dayt.concat(", ",dt," ",monthval," ",year);
    }

    /*
    let d=valObj.data.timelines[0].intervals[0].startTime;
    const firstdate = new Date(d);
    const fd1 = firstdate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    let d2=valObj.data.timelines[0].intervals[1].startTime;
    const firstdate2 = new Date(d2);
    const fd2 = firstdate2.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    let d3=valObj.data.timelines[0].intervals[2].startTime;
    const firstdate3 = new Date(d3);
    const fd3 = firstdate3.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    let d4=valObj.data.timelines[0].intervals[3].startTime;
    const firstdate4 = new Date(d4);
    const fd4 = firstdate4.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    let d5=valObj.data.timelines[0].intervals[4].startTime;
    const firstdate5 = new Date(d5);
    const fd5 = firstdate5.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    let d6=valObj.data.timelines[0].intervals[5].startTime;
    const firstdate6 = new Date(d6);
    const fd6 = firstdate6.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    */

    /*
    let d7=valObj.data.timelines[0].intervals[6].startTime;
    const firstdate7 = new Date(d7);
    const fd7 = firstdate7.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
     */


    document.getElementById("onedate").innerHTML=finalDate[0];
    document.getElementById("twodate").innerHTML=finalDate[1];
    document.getElementById("threedate").innerHTML=finalDate[2];
    document.getElementById("fourdate").innerHTML=finalDate[3];
    document.getElementById("fivedate").innerHTML=finalDate[4];
    document.getElementById("sixdate").innerHTML=finalDate[5];
    //document.getElementById("sevendate").innerHTML=fd7;


    const weatherCode0=valObj.data.timelines[0].intervals[0].values.weatherCode;
    const strWC0=weatherCode0.toString();

    const x0=weather[strWC0][1];

    var checkTab1=document.getElementById("onestatus").childElementCount;
    if(checkTab1==0) {
        var imgToDisp0 = document.createElement("img");
        imgToDisp0.setAttribute("src", x0);
        imgToDisp0.setAttribute("width", "50");
        imgToDisp0.setAttribute("height", "50");
        document.getElementById("onestatus").appendChild(imgToDisp0);
    }
    document.getElementById("extra1").innerHTML=weather[strWC0][0];

    //const textNode0 = document.createTextNode(weather[strWC0][0]);
    //document.getElementById("onestatus").appendChild(textNode0);
    //document.getElementById("onestatus").innerHTML=weather[strWC0][0];

    const weatherCode1=valObj.data.timelines[0].intervals[1].values.weatherCode;
    const strWC1=weatherCode1.toString();

    const x1=weather[strWC1][1];
    var checkTab2=document.getElementById("twostatus").childElementCount;
    if(checkTab2==0) {
        var imgToDisp1 = document.createElement("img");
        imgToDisp1.setAttribute("src", x1);
        imgToDisp1.setAttribute("width", "50");
        imgToDisp1.setAttribute("height", "50");
        document.getElementById("twostatus").appendChild(imgToDisp1);
    }
    document.getElementById("extra2").innerHTML=weather[strWC1][0];

    const weatherCode2=valObj.data.timelines[0].intervals[2].values.weatherCode;
    const strWC2=weatherCode2.toString();

    const x2=weather[strWC2][1];
    var checkTab3=document.getElementById("threestatus").childElementCount;
    if(checkTab3==0) {
        var imgToDisp2 = document.createElement("img");
        imgToDisp2.setAttribute("src", x2);
        imgToDisp2.setAttribute("width", "50");
        imgToDisp2.setAttribute("height", "50");

        document.getElementById("threestatus").appendChild(imgToDisp2);
    }
    document.getElementById("extra3").innerHTML=weather[strWC2][0];

    const weatherCode3=valObj.data.timelines[0].intervals[3].values.weatherCode;
    const strWC3=weatherCode3.toString();

    const x3=weather[strWC3][1];
    var checkTab4=document.getElementById("fourstatus").childElementCount;
    if(checkTab4==0) {
        var imgToDisp3 = document.createElement("img");
        imgToDisp3.setAttribute("src", x3);
        imgToDisp3.setAttribute("width", "50");
        imgToDisp3.setAttribute("height", "50");

        document.getElementById("fourstatus").appendChild(imgToDisp3);
    }
    document.getElementById("extra4").innerHTML=weather[strWC3][0];


    const weatherCode4=valObj.data.timelines[0].intervals[4].values.weatherCode;
    const strWC4=weatherCode4.toString();

    const x4=weather[strWC4][1];
    var checkTab5=document.getElementById("fivestatus").childElementCount;
    if(checkTab5==0) {
        var imgToDisp4 = document.createElement("img");
        imgToDisp4.setAttribute("src", x4);
        imgToDisp4.setAttribute("width", "50");
        imgToDisp4.setAttribute("height", "50");

        document.getElementById("fivestatus").appendChild(imgToDisp4);
    }
    document.getElementById("extra5").innerHTML=weather[strWC4][0];


    const weatherCode5=valObj.data.timelines[0].intervals[5].values.weatherCode;
    const strWC5=weatherCode5.toString();

    const x5=weather[strWC5][1];
    var checkTab5=document.getElementById("sixstatus").childElementCount;
    if(checkTab5==0) {
        var imgToDisp5 = document.createElement("img");
        imgToDisp5.setAttribute("src", x5);
        imgToDisp5.setAttribute("width", "50");
        imgToDisp5.setAttribute("height", "50");

        document.getElementById("sixstatus").appendChild(imgToDisp5);
    }
    document.getElementById("extra6").innerHTML=weather[strWC5][0];


    document.getElementById("oneth").innerHTML=valObj.data.timelines[0].intervals[0].values.temperatureMax;
    document.getElementById("twoth").innerHTML=valObj.data.timelines[0].intervals[1].values.temperatureMax;
    document.getElementById("threeth").innerHTML=valObj.data.timelines[0].intervals[2].values.temperatureMax;
    document.getElementById("fourth").innerHTML=valObj.data.timelines[0].intervals[3].values.temperatureMax;
    document.getElementById("fiveth").innerHTML=valObj.data.timelines[0].intervals[4].values.temperatureMax;
    document.getElementById("sixth").innerHTML=valObj.data.timelines[0].intervals[5].values.temperatureMax;

    document.getElementById("onetlow").innerHTML=valObj.data.timelines[0].intervals[0].values.temperatureMin;
    document.getElementById("twotlow").innerHTML=valObj.data.timelines[0].intervals[1].values.temperatureMin;
    document.getElementById("threetlow").innerHTML=valObj.data.timelines[0].intervals[2].values.temperatureMin;
    document.getElementById("fourtlow").innerHTML=valObj.data.timelines[0].intervals[3].values.temperatureMin;
    document.getElementById("fivetlow").innerHTML=valObj.data.timelines[0].intervals[4].values.temperatureMin;
    document.getElementById("sixtlow").innerHTML=valObj.data.timelines[0].intervals[4].values.temperatureMin;

    document.getElementById("onews").innerHTML=valObj.data.timelines[0].intervals[0].values.windSpeed;
    document.getElementById("twows").innerHTML=valObj.data.timelines[0].intervals[1].values.windSpeed;
    document.getElementById("threews").innerHTML=valObj.data.timelines[0].intervals[2].values.windSpeed;
    document.getElementById("fourws").innerHTML=valObj.data.timelines[0].intervals[3].values.windSpeed;
    document.getElementById("fivews").innerHTML=valObj.data.timelines[0].intervals[4].values.windSpeed;
    document.getElementById("sixws").innerHTML=valObj.data.timelines[0].intervals[5].values.windSpeed;

}

function hideOthers(){
    document.getElementById("output").style.display="none";
    document.getElementById("tableoutput").style.display="none";
    document.getElementById("WeatherDet").style.display="block";
    document.getElementById("bkgrnd").setAttribute("style","height:1270px");
}


function mycardDisp0(){
    hideOthers();
    var rowDataNo=parseInt(this.id);
    let tempday0=valObj.data.timelines[0].intervals[rowDataNo].startTime;
    const dwc0 = new Date(tempday0);
    const day0 = dwc0.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    document.getElementById("dayWC").innerHTML=day0;

    const weatherCode0=valObj.data.timelines[0].intervals[rowDataNo].values.weatherCode;
    const strWC0=weatherCode0.toString();
    document.getElementById("statWC").innerHTML=weather[strWC0][0];
    var tmax=valObj.data.timelines[0].intervals[rowDataNo].values.temperatureMax;
    const t1=tmax.toString();
    var tmin=valObj.data.timelines[0].intervals[rowDataNo].values.temperatureMin;
    const t2=tmin.toString();
    const finalt=t1.concat("&deg","F","/",t2,"&deg","F")
    document.getElementById("tempWC").innerHTML=finalt;

    const xdisp=weather[strWC0][1];
    var imgDWD = document.createElement("img");
    imgDWD.setAttribute("src", xdisp);
    imgDWD.setAttribute("width", "150");
    imgDWD.setAttribute("height", "150");
    const childList=document.getElementById("topright");
    if(childList.hasChildNodes()){
        childList.removeChild(childList.firstChild);
    }
    document.getElementById("topright").appendChild(imgDWD);

    let pptvaltodec=valObj.data.timelines[0].intervals[rowDataNo].values.precipitationType;
    const ppts=pptvaltodec.toString();
    document.getElementById("ppt").innerHTML=ppttype[ppts];
    let crval=valObj.data.timelines[0].intervals[rowDataNo].values.precipitationProbability;
    const crs=crval.toString();
    document.getElementById("cr").innerHTML=crs.concat("%");

    let wsval=valObj.data.timelines[0].intervals[rowDataNo].values.windSpeed;
    const wss=wsval.toString()
    document.getElementById("wispeed").innerHTML=wss.concat("mph");
    let hval=valObj.data.timelines[0].intervals[rowDataNo].values.humidity;
    const hs=hval.toString();
    document.getElementById("h").innerHTML=hs.concat("%");
    let vval=valObj.data.timelines[0].intervals[rowDataNo].values.visibility;
    const vs=vval.toString();
    document.getElementById("v").innerHTML=vs.concat("mi");

    let srval=valObj.data.timelines[0].intervals[rowDataNo].values.sunriseTime;
    console.log(srval);
    const srtime= new Date(srval);
    console.log(srtime);
    const srstr = srtime.toLocaleTimeString();
    const srpart1=srstr.slice(0,4);
    const srpart2=srstr.slice(8,);
    const srfinalpart=srpart1.concat(srpart2);
    console.log(srfinalpart);

    let ssval=valObj.data.timelines[0].intervals[rowDataNo].values.sunsetTime;
    const sstime= new Date(ssval);
    const ssstr = sstime.toLocaleTimeString();
    const sspart1=ssstr.slice(0,4);
    const sspart2=ssstr.slice(8,);
    const ssfinalpart=sspart1.concat(sspart2);

    const finalstime=srfinalpart.concat("/",ssfinalpart);

    document.getElementById("ss").innerHTML=finalstime;

}



function DispCharts(){

    if(document.getElementById("toggleing").src.endsWith("point-down-512.png")) {
        document.getElementById("bkgrnd").setAttribute("style","height:2100px");


        document.getElementById("toggleing").src = "Images/point-up-512.png";

        const numbers = [0, 1, 2, 3, 4, 5];
        const timeArray = [];
        for (count in numbers) {
            var t = new Date(valObj.data.timelines[0].intervals[count].startTime);
            timeArray[count] = t.getTime();
        }

        const templowArray = [];
        const temphighArray=[];
        for (count in numbers) {
            templowArray[count] = valObj.data.timelines[0].intervals[count].values.temperatureMin;
            temphighArray[count]= valObj.data.timelines[0].intervals[count].values.temperatureMax;

        }


        document.getElementById("containerFirst").style.display = "block";
        /*
        var ranges = [
            [1728432000000, 13, 19],
            [1728518400000, 13, 18],
            [1728604800000, 11, 23],
            [1728691200000, 11, 18],
        ];*/

        var ranges=[
            [timeArray[0],templowArray[0],temphighArray[0]],
            [timeArray[1],templowArray[1],temphighArray[1]],
            [timeArray[2],templowArray[2],temphighArray[2]],
            [timeArray[3],templowArray[3],temphighArray[3]],
            [timeArray[4],templowArray[4],temphighArray[4]],
            [timeArray[5],templowArray[5],temphighArray[5]]
        ]

        Highcharts.chart('containerFirst', {
            title: {
                text: 'Temperature Ranges (Min, Max)'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            time: {
                useUTC: false
            },

            tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: '°F',
                xDateFormat: '%A, %b %e'
            },
            legend: {
                enabled: false
            },

            series: [{
                name: '',
                data: ranges,
                type: 'arearange',
                linewidth: 5,
                lineColor:'#FFA500',
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        x2: 0,
                        y1: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFA500'],
                        [1, '#72bcd4']
                    ]
                }
            }]
        })





        //second graph
        document.getElementById("container").style.display = "block";

        function Meteogram(container) {

            this.humidity = [];
            this.winds = [];
            this.temperatures = [];
            this.pressures = [];

            // Initialize
            //this.json = json;
            this.container = container;

            // Run
            this.parseYrData();
        }


        /**
         * Draw blocks around wind arrows, below the plot area
         */
        Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
            const xAxis = chart.xAxis[0];

            for (
                let pos = xAxis.min, max = xAxis.max, i = 0;
                pos <= max + 36e5; pos += 36e5,
                    i += 1
            ) {

                // Get the X position
                const isLast = pos === max + 36e5,
                    x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

                // Draw the vertical dividers and ticks
                const isLong = this.resolution > 36e5 ?
                    pos % this.resolution === 0 :
                    i % 2 === 0;

                chart.renderer
                    .path([
                        'M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
                        'L', x, chart.plotTop + chart.plotHeight + 32,
                        'Z'
                    ])
                    .attr({
                        stroke: chart.options.chart.plotBorderColor,
                        'stroke-width': 1
                    })
                    .add();
            }

            // Center items in block
            chart.get('windbarbs').markerGroup.attr({
                translateX: chart.get('windbarbs').markerGroup.translateX + 5
            });
        };

        /**
         * Build and return the Highcharts options structure
         */
        Meteogram.prototype.getChartOptions = function () {
            return {
                chart: {
                    renderTo: this.container,
                    marginBottom: 70,
                    marginRight: 40,
                    marginTop: 50,
                    plotBorderWidth: 1,
                    height: 310,
                    alignTicks: false,
                    scrollablePlotArea: {
                        minWidth: 720
                    }
                },
                time: {
                    useUTC: false
                },

                defs: {
                    patterns: [{
                        id: 'precipitation-error',
                        path: {
                            d: [
                                'M', 3.3, 0, 'L', -6.7, 10,
                                'M', 6.7, 0, 'L', -3.3, 10,
                                'M', 10, 0, 'L', 0, 10,
                                'M', 13.3, 0, 'L', 3.3, 10,
                                'M', 16.7, 0, 'L', 6.7, 10
                            ].join(' '),
                            stroke: '#68CFE8',
                            strokeWidth: 1
                        }
                    }]
                },

                title: {
                    text: 'Hourly Weather (For Next 5 days)',
                    align: 'center',
                    style: {
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }
                },


                tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat:
                        '<small>{point.x:%A, %b %e, %H:%M} - ' +
                        '{point.point.to:%H:%M}</small><br>' +
                        '<b>{point.point.symbolName}</b><br>'

                },

                xAxis: [{ // Bottom X axis
                    type: 'datetime',
                    tickInterval: 2 * 36e5, // two hours
                    minorTickInterval: 36e5, // one hour
                    tickLength: 0,
                    gridLineWidth: 1,
                    gridLineColor: 'rgba(128, 128, 128, 0.1)',
                    startOnTick: false,
                    endOnTick: false,
                    minPadding: 0,
                    maxPadding: 0,
                    offset: 30,
                    showLastLabel: true,
                    labels: {
                        format: '{value:%H}'
                    },
                    crosshair: true
                }, { // Top X axis
                    linkedTo: 0,
                    type: 'datetime',
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        format: '{value:<span style="font-size: 12px; font-weight: ' +
                            'bold">%a</span> %b %e}',
                        align: 'left',
                        x: 3,
                        y: 8
                    },
                    opposite: true,
                    tickLength: 20,
                    gridLineWidth: 1
                }],

                yAxis: [{ // temperature axis
                    title: {
                        text: null
                    },
                    labels: {
                        format: '{value}°',
                        style: {
                            fontSize: '10px'
                        },
                        x: -3
                    },
                    plotLines: [{ // zero plane
                        value: 0,
                        color: '#BBBBBB',
                        width: 1,
                        zIndex: 2
                    }],
                    maxPadding: 0.3,
                    minRange: 8,
                    tickInterval: 1,
                    gridLineColor: 'rgba(128, 128, 128, 0.1)'

                }, { // precipitation axis
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineWidth: 0,
                    tickLength: 0,
                    minRange: 10,
                    min: 0

                }, { // Air pressure
                    allowDecimals: false,
                    title: { // Title on top of axis
                        text: 'hPa',
                        offset: 0,
                        align: 'high',
                        rotation: 0,
                        style: {
                            fontSize: '10px',
                            color: '#FFA500'
                        },
                        textAlign: 'left',
                        x: 3
                    },
                    labels: {
                        style: {
                            fontSize: '8px',
                            color:'#FFA500'
                        },
                        y: 2,
                        x: 3
                    },
                    gridLineWidth: 0,
                    opposite: true,
                    showLastLabel: false
                }],

                legend: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        pointPlacement: 'between'
                    }
                },


                series: [{
                    name: 'Temperature',
                    data: this.temperatures,
                    type: 'spline',
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                            ' ' +
                            '{series.name}: <b>{point.y}°F</b><br/>'
                    },
                    zIndex: 1,
                    color: '#FF3333',
                    negativeColor: '#48AFE8'
                },  {
                    name: 'Humidity',
                    data: this.humidity,
                    type: 'column',
                    color: '#68CFE8',
                    yAxis: 1,
                    groupPadding: 0,
                    pointPadding: 0,
                    grouping: false,
                    dataLabels: {
                        enabled: !this.hasPrecipitationError,
                        filter: {
                            operator: '>',
                            property: 'y',
                            value: 0
                        },
                        style: {
                            fontSize: '8px',
                            color: '#666'
                        }
                    },
                    tooltip: {
                        valueSuffix: '%'
                    }
                }, {
                    name: 'Air pressure',
                    color: '#FFA500',
                    data: this.pressures,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    tooltip: {
                        valueSuffix: ' hPa'
                    },
                    dashStyle: 'shortdot',
                    yAxis: 2
                }, {
                    name: 'Wind',
                    type: 'windbarb',
                    id: 'windbarbs',
                    color: Highcharts.getOptions().colors[1],
                    lineWidth: 1.2,
                    data: this.winds,
                    dataGrouping: {
                        units: [
                            ['hour', [2]]
                        ]},
                    vectorLength: 10,
                    yOffset: -15,
                    tooltip: {
                        valueSuffix: ' m/s'
                    }
                }]
            };
        };

        /**
         * Post-process the chart from the callback function, the second argument
         * Highcharts.Chart.
         */
        Meteogram.prototype.onChartLoad = function (chart) {
            this.drawBlocksForWindArrows(chart);

        };


        Meteogram.prototype.error = function () {
            document.getElementById('loading').innerHTML =
                '<i class="fa fa-frown-o"></i> Failed loading data, please try again ' +
                'later';
        };

        /**
         * Handle the data. This part of the code is not Highcharts specific, but deals
         * with yr.no's specific data format
         */
        Meteogram.prototype.parseYrData = function () {
            /*
                let pointStart;

                if (!this.json) {
                    return this.error();
                }

                // Loop over hourly (or 6-hourly) forecasts
                this.json.properties.timeseries.forEach((node, i) => {
                    const x = Date.parse(node.time);
                        nextHours = node.data.next_1_hours,
                        to = node.data.next_1_hours ? x + 36e5 : x + 6 * 36e5;

                    if (to > pointStart + 48 * 36e5) {
                        return;
                    }

                    // Populate the parallel arrays
                    //this.symbols.push(nextHours.summary.symbol_code);
                    console.log(i);
                    */
            /*this.temperatures.push({
                x,
                y: node.data.instant.details.air_temperature,
            });*/


            /*
    this.precipitations.push({
        x,
        y: nextHours.details.precipitation_amount
    });*/
            /*
    if (i % 2 === 0) {
        this.winds.push({
            x,
            value: node.data.instant.details.wind_speed,
            direction: node.data.instant.details.wind_from_direction
        });
    }*/
            /*
    this.pressures.push({
        x,
        y: node.data.instant.details.air_pressure_at_sea_level
    });*/
            /*
                    if (i === 0) {
                        pointStart = (x + to) / 2;
                    }
                });*/
            var numOfVals=valObj.data.timelines[1].intervals.length;
            var timeArrayhourly=[];
            for (counter=0;counter<numOfVals;counter++) {
                var t = new Date(valObj.data.timelines[1].intervals[counter].startTime);
                timeArrayhourly[counter] = t.getTime();
            }

            var tempArray=[];
            for (counter=0;counter<numOfVals;counter++) {
                var valueNeeded=valObj.data.timelines[1].intervals[counter].values.temperature;
                tempArray[counter]=valueNeeded;
            }
            var humidityArray=[];
            for (counter=0;counter<numOfVals;counter++) {
                var valueNeeded=valObj.data.timelines[1].intervals[counter].values.humidity;
                humidityArray[counter]=valueNeeded;
            }
            var airpArray=[];
            for (counter=0;counter<numOfVals;counter++) {
                var valueNeeded=valObj.data.timelines[1].intervals[counter].values.pressureSeaLevel;
                airpArray[counter]=valueNeeded;
            }
            var winspeedArray=[];
            var winddirArray=[];
            for (counter=0;counter<numOfVals;counter++) {
                var valueNeeded1=valObj.data.timelines[1].intervals[counter].values.windSpeed;
                winspeedArray[counter]=valueNeeded1;
                var valueNeeded2=valObj.data.timelines[1].intervals[counter].values.windDirection;
                winddirArray[counter]=valueNeeded2;
            }

            for (counter=0;counter<numOfVals;counter++) {
                this.temperatures.push({x:timeArrayhourly[counter],y:tempArray[counter]});
                this.humidity.push({x:timeArrayhourly[counter],y:humidityArray[counter]});
                this.pressures.push({x:timeArrayhourly[counter],y:airpArray[counter]});
                    this.winds.push({
                        x: timeArrayhourly[counter],
                        value: winspeedArray[counter],
                        direction: winddirArray[counter]
                    })




            }






            // Create the chart when the data is loaded
            //this.createChart();
            this.chart = new Highcharts.Chart(this.getChartOptions(), chart => {
                this.onChartLoad(chart)
            });
        };
// End of the Meteogram protype


        window.meteogr = new Meteogram('container');

    }
    else{
        document.getElementById("containerFirst").style.display = "none";
        document.getElementById("container").style.display = "none";
        document.getElementById("toggleing").src = "Images/point-down-512.png";
        document.getElementById("bkgrnd").setAttribute("style","height:1270px");

    }


}

//validateformandgetdata()


