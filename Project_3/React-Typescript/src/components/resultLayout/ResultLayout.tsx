
import { useState,useEffect} from 'react';
import { myVals } from '../result/Result.tsx';
import Rightpage from '../rightpage/Rightpage.tsx'
import ProgressBar  from './Progressbar.tsx';
import Table from 'react-bootstrap/Table';
import Favorites from '../favorites/Favorites.tsx';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Chart1, { graphVals } from '../chart1/Chart1.tsx';
import Chart2 from '../chart2/Chart2.tsx';
import {AnimatePresence} from 'framer-motion';
import {motion} from 'framer-motion';
import Button from 'react-bootstrap/Button';
import './resultLayout.css';



export interface neededData{
    date:string;
    status:string;
    maxtemp:number;
    mintemp:number;
    apptemp:number;
    sunrise:string;
    sunset:string;
    humidity:number;
    windspeed:number;
    visibility:number;
    cloudcover:number;
}

export interface weatherArray{
    [key:number]:string[];
}[];



const ResultLayout = (props:myVals) => {

    const[moveLeft,setmoveLeft]=useState(false);
    const[moveRight,setmoveRight]=useState(false);

    const [flag, setFlag] = useState(true);
    

    const handleClick1=(event: any)=>{
        console.log(event.target);
        console.log("Iniside the handleClick")
        setmoveLeft(true);
        setTimeout(() => {
            setFlag(!flag);;
          },200);
        
    }

    const handleClick2=()=>{
        setmoveLeft(false);
        setmoveRight(true);
        setFlag(true);
        
        
    }

    //get the values here//
    console.log("Insideeeeeeeeeeeeee RESULT");
    console.log(props.val);
    var ll:string=props.val;
    var llv:string[]=ll.split(',');
    const latval:string=llv[0];
  
    console.log(latval)
    const longval:string=llv[1];
    console.log(longval);
  

    const weather:weatherArray={
        1000:["Clear,Sunny","Images/clear_day.svg"],
        1100:["Mostly Clear", "Images/mostly_clear_day.svg"],
        1101: ["Partly Cloudy", "Images/partly_cloudy_day.svg"],
        1102: ["Mostly Cloudy", "Images/mostly_cloudy.svg"],
        1001: ["Cloudy", "Images/cloudy.svg"],
        2000: ["Fog", "Images/fog.svg"],
        2100: ["Light Fog", "Images/fog_light.svg"],
        8000: ["Thunderstorm", "Images/tstorm.svg"],
        5001: ["Flurries", "Images/flurries.svg"],
        5100: ["Light Snow", "Images/snow_light.svg"],
        5000: ["Snow", "Images/snow.svg"],
        5101: ["Heavy Snow", "Images/snow_heavy.svg"],
        7102: ["Light Ice Pellets", "Images/ice_pellets_light.svg"],
        7000: ["Ice Pellets", "Images/ice_pellets.svg"],
        7101: ["Heavy Ice Pellets", "Images/ice_pellets_heavy.svg"],
        4000: ["Drizzle", "Images/drizzle.svg"],
        6000: ["Freezing Drizzle", "Images/freezing_drizzle.svg"],
        6200: ["Light Freezing Rain", "Images/freezing_rain_light.svg"],
        6001: ["Freezing Rain", "Images/freezing_rain.svg"],
        6201: ["Heavy Freexing Rain", "Images/freezing_rain_heavy.svg"],
        4200: ["Light Rain", "Images/rain_light.svg"],
        4001: ["Rain", "Images/rain.svg"],
        4201: ["Heavy Rain", "Images/rain_heavy.svg"]
    };

    const [dailyWCOne,setDailyWCOne]=useState('');
    const [dailyWCTwo,setDailyWCTwo]=useState('');
    const [dailyWCThree,setDailyWCThree]=useState('');
    const [dailyWCFour,setDailyWCFour]=useState('');
    const [dailyWCFive,setDailyWCFive]=useState('');
    const [dailyWCSix,setDailyWCSix]=useState('');


    const [imageSrcOne, setImageSrcOne] = useState('clear_day.svg');
    const [imageSrcTwo, setImageSrcTwo] = useState('clear_day.svg');
    const [imageSrcThree, setImageSrcThree] = useState('clear_day.svg');
    const [imageSrcFour, setImageSrcFour] = useState('clear_day.svg');
    const [imageSrcFive, setImageSrcFive] = useState('clear_day.svg');
    const [imageSrcSix, setImageSrcSix] = useState('clear_day.svg');


    const [dailydateOne,setDailydateOne]=useState('');
    const [dailydateTwo,setDailydateTwo]=useState('');
    const [dailydateThree,setDailydateThree]=useState('');
    const [dailydateFour,setDailydateFour]=useState('');
    const [dailydateFive,setDailydateFive]=useState('');
    const [dailydateSix,setDailydateSix]=useState('');

    const [dailyTempHighOne,setDailyTempHighOne]=useState(0);
    const [dailyTempHighTwo,setDailyTempHighTwo]=useState(0);
    const [dailyTempHighThree,setDailyTempHighThree]=useState(0);
    const [dailyTempHighFour,setDailyTempHighFour]=useState(0);
    const [dailyTempHighFive,setDailyTempHighFive]=useState(0);
    const [dailyTempHighSix,setDailyTempHighSix]=useState(0);

    const [dailyTempLowOne,setDailyTempLowOne]=useState(0);
    const [dailyTempLowTwo,setDailyTempLowTwo]=useState(0);
    const [dailyTempLowThree,setDailyTempLowThree]=useState(0);
    const [dailyTempLowFour,setDailyTempLowFour]=useState(0);
    const [dailyTempLowFive,setDailyTempLowFive]=useState(0);
    const [dailyTempLowSix,setDailyTempLowSix]=useState(0);


    const[dailyWSOne,setDailyWSOne]=useState(0);
    const[dailyWSTwo,setDailyWSTwo]=useState(0);
    const[dailyWSThree,setDailyWSThree]=useState(0);
    const[dailyWSFour,setDailyWSFour]=useState(0);
    const[dailyWSFive,setDailyWSFive]=useState(0);
    const[dailyWSSix,setDailyWSSix]=useState(0);

    const[showData,setShowData]=useState(false);




    const[datapassed,setDatapassed]=useState<graphVals>({
        dataValsArray1:[0,0,0],
        dataValsArray2:[0,0,0],
        dataValsArray3:[0,0,0],
        dataValsArray4:[0,0,0],
        dataValsArray5:[0,0,0],
        dataValsArray6:[0,0,0]

    });

    const[chooseRow, setChooseRow]=useState(0);
    const[Row1Data, setRow1Data]=useState<neededData>();
    const[Row2Data, setRow2Data]=useState<neededData>();
    const[Row3Data, setRow3Data]=useState<neededData>();
    const[Row4Data, setRow4Data]=useState<neededData>();
    const[Row5Data, setRow5Data]=useState<neededData>();
    const[Row6Data, setRow6Data]=useState<neededData>();



    const[result,setResult]=useState();
    

      const fetchData = async () => {
        try {

            


            const urlpart1:string="/processdata?lat=";
            const urlpart2:string=latval;
            const urlpart3:string="&long="
            const urlpart4:string=longval;
            const finalURL:string=urlpart1+urlpart2+urlpart3+urlpart4;
            console.log(finalURL);

            
        
          const response = await fetch(finalURL);
          const resp2= await response.json();
          console.log(resp2);
          setDailyTempHighOne(resp2.data.timelines[0].intervals[0].values.temperatureMax);
          setDailyTempHighTwo(resp2.data.timelines[0].intervals[1].values.temperatureMax);
          setDailyTempHighThree(resp2.data.timelines[0].intervals[2].values.temperatureMax);
          setDailyTempHighFour(resp2.data.timelines[0].intervals[3].values.temperatureMax);
          setDailyTempHighFive(resp2.data.timelines[0].intervals[4].values.temperatureMax);
          setDailyTempHighSix(resp2.data.timelines[0].intervals[5].values.temperatureMax);

          setDailyTempLowOne(resp2.data.timelines[0].intervals[0].values.temperatureMin);
          setDailyTempLowTwo(resp2.data.timelines[0].intervals[1].values.temperatureMin);
          setDailyTempLowThree(resp2.data.timelines[0].intervals[2].values.temperatureMin);
          setDailyTempLowFour(resp2.data.timelines[0].intervals[3].values.temperatureMin);
          setDailyTempLowFive(resp2.data.timelines[0].intervals[4].values.temperatureMin);
          setDailyTempLowSix(resp2.data.timelines[0].intervals[5].values.temperatureMin);




          setDailyWSOne(resp2.data.timelines[0].intervals[0].values.windSpeed);
          setDailyWSTwo(resp2.data.timelines[0].intervals[1].values.windSpeed);
          setDailyWSThree(resp2.data.timelines[0].intervals[2].values.windSpeed);
          setDailyWSFour(resp2.data.timelines[0].intervals[3].values.windSpeed);
          setDailyWSFive(resp2.data.timelines[0].intervals[4].values.windSpeed);
          setDailyWSSix(resp2.data.timelines[0].intervals[5].values.windSpeed);

          const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          const day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          const finalDate:string[]=[];
      
          for(var ndays:number=0;ndays<6;ndays++){
              const d = new Date(resp2.data.timelines[0].intervals[ndays].startTime);
              let dt=d.getDate();
              let dayt = day[d.getDay()];
              let year=d.getFullYear();
              let monthval = month[d.getMonth()];
              finalDate[ndays]=dayt.concat(", ",monthval,". ",dt.toString(),", ",year.toString());
          }
          console.log(finalDate[0]);
          setDailydateOne(finalDate[0]);
          setDailydateTwo(finalDate[1]);
          setDailydateThree(finalDate[2]);
          setDailydateFour(finalDate[3]);
          setDailydateFive(finalDate[4]);
          setDailydateSix(finalDate[5]);
          
         setDailyWCOne(weather[resp2.data.timelines[0].intervals[0].values.weatherCode][0])
         setDailyWCTwo(weather[resp2.data.timelines[0].intervals[1].values.weatherCode][0])
         setDailyWCThree(weather[resp2.data.timelines[0].intervals[2].values.weatherCode][0])
         setDailyWCFour(weather[resp2.data.timelines[0].intervals[3].values.weatherCode][0])
         setDailyWCFive(weather[resp2.data.timelines[0].intervals[4].values.weatherCode][0])
         setDailyWCSix(weather[resp2.data.timelines[0].intervals[5].values.weatherCode][0])

         setImageSrcOne(weather[resp2.data.timelines[0].intervals[0].values.weatherCode][1]);
         setImageSrcTwo(weather[resp2.data.timelines[0].intervals[1].values.weatherCode][1]);
         setImageSrcThree(weather[resp2.data.timelines[0].intervals[2].values.weatherCode][1]);
         setImageSrcFour(weather[resp2.data.timelines[0].intervals[3].values.weatherCode][1]);
         setImageSrcFive(weather[resp2.data.timelines[0].intervals[4].values.weatherCode][1]);
         setImageSrcSix(weather[resp2.data.timelines[0].intervals[5].values.weatherCode][1]);

            const sunrise:string[]=[];
            for(var ndays:number=0;ndays<6;ndays++){
                let srval:string=resp2.data.timelines[0].intervals[ndays].values.sunriseTime;
                var srtime:Date= new Date(srval);
                var srstr:string = srtime.toLocaleTimeString();
                var  srpart1:string=srstr.slice(0,4);
                var srpart2:string=srstr.slice(8,);
                var srfinalpart=srpart1.concat(srpart2);
                sunrise[ndays]=srfinalpart;
                console.log(srfinalpart);
            }

         const sunset:string[]=[];
         for(var ndays:number=0;ndays<6;ndays++){
            let srval:string=resp2.data.timelines[0].intervals[ndays].values.sunsetTime;
            var srtime:Date= new Date(srval);
            var srstr:string = srtime.toLocaleTimeString();
            var  srpart1:string=srstr.slice(0,4);
            var srpart2:string=srstr.slice(8,);
            var srfinalpart=srpart1.concat(srpart2);
            sunset[ndays]=srfinalpart;
            console.log(srfinalpart);
         }


         setRow1Data({
            date:finalDate[0],
            status: weather[resp2.data.timelines[0].intervals[0].values.weatherCode][0],
            maxtemp:resp2.data.timelines[0].intervals[0].values.temperatureMax,
            mintemp:resp2.data.timelines[0].intervals[0].values.temperatureMin,
            apptemp:resp2.data.timelines[0].intervals[0].values.temperatureApparent,
            sunrise: sunrise[0],
            sunset:sunset[0],
            humidity:resp2.data.timelines[0].intervals[0].values.humidity,
            windspeed:resp2.data.timelines[0].intervals[0].values.windSpeed,
            visibility:resp2.data.timelines[0].intervals[0].values.visibility,
            cloudcover:resp2.data.timelines[0].intervals[0].values.cloudCover

            });

            setRow2Data({
                date:finalDate[1],
                status: weather[resp2.data.timelines[0].intervals[0].values.weatherCode][0],
                maxtemp:resp2.data.timelines[0].intervals[1].values.temperatureMax,
                mintemp:resp2.data.timelines[0].intervals[1].values.temperatureMin,
                apptemp:resp2.data.timelines[0].intervals[1].values.temperatureApparent,
                sunrise: sunrise[1],
                sunset:sunset[1],
                humidity:resp2.data.timelines[0].intervals[1].values.humidity,
                windspeed:resp2.data.timelines[0].intervals[1].values.windSpeed,
                visibility:resp2.data.timelines[0].intervals[1].values.visibility,
                cloudcover:resp2.data.timelines[0].intervals[1].values.cloudCover

            });

            setRow3Data({
                date:finalDate[2],
                status: weather[resp2.data.timelines[0].intervals[2].values.weatherCode][0],
                maxtemp:resp2.data.timelines[0].intervals[2].values.temperatureMax,
                mintemp:resp2.data.timelines[0].intervals[2].values.temperatureMin,
                apptemp:resp2.data.timelines[0].intervals[2].values.temperatureApparent,
                sunrise: sunrise[2],
                sunset:sunset[2],
                humidity:resp2.data.timelines[0].intervals[2].values.humidity,
                windspeed:resp2.data.timelines[0].intervals[2].values.windSpeed,
                visibility:resp2.data.timelines[0].intervals[2].values.visibility,
                cloudcover:resp2.data.timelines[0].intervals[2].values.cloudCover

            });

            setRow4Data({
                date:finalDate[3],
                status: weather[resp2.data.timelines[0].intervals[3].values.weatherCode][0],
                maxtemp:resp2.data.timelines[0].intervals[3].values.temperatureMax,
                mintemp:resp2.data.timelines[0].intervals[3].values.temperatureMin,
                apptemp:resp2.data.timelines[0].intervals[3].values.temperatureApparent,
                sunrise: sunrise[3],
                sunset:sunset[3],
                humidity:resp2.data.timelines[0].intervals[3].values.humidity,
                windspeed:resp2.data.timelines[0].intervals[3].values.windSpeed,
                visibility:resp2.data.timelines[0].intervals[3].values.visibility,
                cloudcover:resp2.data.timelines[0].intervals[3].values.cloudCover

            });
            setRow5Data({
                date:finalDate[4],
                status: weather[resp2.data.timelines[0].intervals[4].values.weatherCode][0],
                maxtemp:resp2.data.timelines[0].intervals[4].values.temperatureMax,
                mintemp:resp2.data.timelines[0].intervals[4].values.temperatureMin,
                apptemp:resp2.data.timelines[0].intervals[4].values.temperatureApparent,
                sunrise: sunrise[4],
                sunset:sunset[4],
                humidity:resp2.data.timelines[0].intervals[4].values.humidity,
                windspeed:resp2.data.timelines[0].intervals[4].values.windSpeed,
                visibility:resp2.data.timelines[0].intervals[4].values.visibility,
                cloudcover:resp2.data.timelines[0].intervals[4].values.cloudCover

            });
            setRow6Data({
                date:finalDate[5],
                status: weather[resp2.data.timelines[0].intervals[5].values.weatherCode][0],
                maxtemp:resp2.data.timelines[0].intervals[5].values.temperatureMax,
                mintemp:resp2.data.timelines[0].intervals[5].values.temperatureMin,
                apptemp:resp2.data.timelines[0].intervals[5].values.temperatureApparent,
                sunrise: sunrise[5],
                sunset:sunset[5],
                humidity:resp2.data.timelines[0].intervals[5].values.humidity,
                windspeed:resp2.data.timelines[0].intervals[5].values.windSpeed,
                visibility:resp2.data.timelines[0].intervals[5].values.visibility,
                cloudcover:resp2.data.timelines[0].intervals[5].values.cloudCover

            });

            const timeArray:number[] = [];
            const templowArray:number[] = [];
            const temphighArray:number[]= [];

            for(var ndays:number=0;ndays<6;ndays++){
                var t = new Date(resp2.data.timelines[0].intervals[ndays].startTime);
                timeArray[ndays] = t.getTime();
                templowArray[ndays] = resp2.data.timelines[0].intervals[ndays].values.temperatureMin;
                temphighArray[ndays]= resp2.data.timelines[0].intervals[ndays].values.temperatureMax;
                }
        
                setDatapassed({
                    dataValsArray1: [timeArray[0],templowArray[0],temphighArray[0]],
                    dataValsArray2: [timeArray[1],templowArray[1],temphighArray[1]],
                    dataValsArray3: [timeArray[2],templowArray[2],temphighArray[2]],
                    dataValsArray4: [timeArray[3],templowArray[3],temphighArray[3]],
                    dataValsArray5: [timeArray[4],templowArray[4],temphighArray[4]],
                    dataValsArray6: [timeArray[5],templowArray[5],temphighArray[5]]

                });



            console.log("Printing json hereeeeeeeeeeeeeeeeee");


    
            

            setResult(resp2);


    

          
          
          
        } catch (error) {
          console.log(error);
          
        } 
      };
      useEffect(() => {
        if(props.val){
            fetchData();
        }
      }, [props.val]);

      useEffect(() => {setShowData(dailyTempLowSix!=0);
      }, [dailyTempLowSix]
    );

      const passVal1 = (event: any) => {
        console.log(event.target);
        setChooseRow(0);
        setFlag(!flag);
    }
    const passVal2 = (event: any) => {
        console.log(event.target);
        setChooseRow(1);
        setFlag(!flag);
    }
    const passVal3 = (event:any) => {
        console.log(event.target);
        setChooseRow(2);
        setFlag(!flag);
    }
    const passVal4 = (event:any) => {
        console.log(event.target);
        setChooseRow(3);
        setFlag(!flag);
    }
    const passVal5 = (event: any) => {
        console.log(event.target);
        setChooseRow(4);
        setFlag(!flag);
    }
    const passVal6 = (event: any) => {
        console.log(event.target);
        setChooseRow(5);
        setFlag(!flag);
    }

    const [changeColor,setChangeColor]=useState(false);
    const handleAddToFav = async (event: any) => {
        setChangeColor(true);
        console.log(event.target);
        const latlongval:string=props.val
        const city:string=props.city;
        const region:string= props.region;
        const url1:string="/storedata?latlongval="+latlongval+"&city="+city+"&state="+region;

        const resp=await fetch(url1);
        const resp2= await resp.json();
        console.log(resp2);

    }







  return (
    <AnimatePresence>
    <div>
    {props.toshow?
    props.val==''||(!showData)?
        <div><ProgressBar /></div>:
        flag ? 
        <motion.div className='LeftOne'
            initial={{x:moveRight?'-100vw':0}}
            animate={{x:moveLeft?'-100vw':0}}
            transition={{duration:moveLeft?0.2:0.1}}
        >
            <div className='container d-flex justify-content-center mt-3'>
        <h4>Forecast at {props.city}, {props.region}</h4>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
            <Button className="favs"onClick={handleAddToFav}>{!changeColor?<img src='Images/star.svg' height={20} width={20} />:<img src='Images/star-fill.svg' height={20} width={20} />}</Button>
            <Button variant="link" style={{color:'#000000'}} onClick={handleClick1}>Details</Button>
            <img src='Images/chevron-right.svg' />
        </div>
        <div style={{marginTop:50}}>
        <div>
        <Tabs 
      defaultActiveKey="dayview"
      id="uncontrolled-tab-example"
      className="nav-item ms-auto"
      >
        <Tab eventKey="dayview" title="Day View">
          <div className='mytable'>
         <Table responsive="sm" style={{marginLeft:-8}}hover>
      <thead >
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Status</th>
          <th>Temp.High(°F)</th>
          <th>Temp.Low(°F)</th>
          <th>Wind Speed(mph)</th>
        </tr>
      </thead>
      <tbody>
        <tr onClick={passVal1}>
          <td>1</td>
          <td><Button variant='link'>{dailydateOne}</Button></td>
          <td> <img src={imageSrcOne} alt="Example" height={50} width={50} />{dailyWCOne}</td>
          <td>{dailyTempHighOne}</td>
          <td>{dailyTempLowOne}</td>
          <td>{dailyWSOne}</td>
        </tr>
        <tr onClick={passVal2}>
          <td>2</td>
          <td><Button variant='link'>{dailydateTwo}</Button></td>
          <td> <img src={imageSrcTwo} alt="Example" height={50} width={50} />{dailyWCTwo}</td>
          <td>{dailyTempHighTwo}</td>
          <td>{dailyTempLowTwo}</td>
          <td>{dailyWSTwo}</td>
        </tr>
        <tr onClick={passVal3}>
          <td>3</td>
          <td><Button variant='link'>{dailydateThree}</Button></td>
          <td> <img src={imageSrcThree} alt="Example" height={50} width={50} />{dailyWCThree}</td>
          <td>{dailyTempHighThree}</td>
          <td>{dailyTempLowThree}</td>
          <td>{dailyWSThree}</td>
        </tr>
        <tr onClick={passVal4}>
          <td>4</td>
          <td><Button variant='link'>{dailydateFour}</Button></td>
          <td> <img src={imageSrcFour} alt="Example" height={50} width={50}/>{dailyWCFour}</td>
          <td>{dailyTempHighFour}</td>
          <td>{dailyTempLowFour}</td>
          <td>{dailyWSFour}</td>
        </tr>
        <tr onClick={passVal5}>
          <td>5</td>
          <td><Button variant='link'>{dailydateFive}</Button></td>
          <td> <img src={imageSrcFive} alt="Example" height={50} width={50}/>{dailyWCFive}</td>
          <td>{dailyTempHighFive}</td>
          <td>{dailyTempLowFive}</td>
          <td>{dailyWSFive}</td>
        </tr>
        <tr onClick={passVal6}>
          <td>6</td>
          <td><Button variant='link'>{dailydateSix}</Button></td>
          <td> <img src={imageSrcSix} alt="Example" height={50} width={50}/>{dailyWCSix}</td>
          <td>{dailyTempHighSix}</td>
          <td>{dailyTempLowSix}</td>
          <td>{dailyWSSix}</td>
        </tr>

      </tbody>
    </Table>
    </div>
    </Tab>
    <Tab eventKey="Daily Temp Chart" title="Daily Temp Chart">
        <Chart1 
        dataValsArray1={datapassed.dataValsArray1} 
        dataValsArray2={datapassed.dataValsArray2}
        dataValsArray3={datapassed.dataValsArray3}
        dataValsArray4={datapassed.dataValsArray4}
        dataValsArray5={datapassed.dataValsArray5}
        dataValsArray6={datapassed.dataValsArray6}
        />
      </Tab>
      <Tab eventKey="Meteogram" title="Meteogram">
      <Chart2 resp2={result}/>
      </Tab>
    </Tabs>
    </div>

    </div>
        </motion.div> : 

        <Rightpage handleclick2={handleClick2} Row1Data={Row1Data} Row2Data={Row2Data} Row3Data={Row3Data} Row4Data={Row4Data} Row5Data={Row5Data} Row6Data={Row6Data} RowNo={chooseRow} ll={props.val} city={props.city} region={props.region}/>
        :<Favorites handleFavClick={props.handleFavClick} favValsFromBE={props.favValsFromBE} favArray={props.favArray} NoOfFavs={props.NoOfFavs}/>
        }

        </div>
        </AnimatePresence>
);
}

export default ResultLayout