import { useEffect } from 'react';
import { useState } from 'react';
import { neededData } from '../resultLayout/ResultLayout';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MapDisp from '../mapDisp/MapDisp';
import Twitter from '../twitter/Twitter'
import {motion} from 'framer-motion';
import './rightpage.css';


export interface datainRight{
    handleclick2:any;
    Row1Data:neededData|undefined;
    Row2Data:neededData|undefined;
    Row3Data:neededData|undefined;
    Row4Data:neededData|undefined;
    Row5Data:neededData|undefined;
    Row6Data:neededData|undefined;
    RowNo:number;
    ll:string;
    city:string;
    region:string;
    
}

const Rightpage = (props:datainRight) => {


    console.log(props.ll);
    var ll:string=props.ll;
    var llv:string[]=ll.split(',');
    const latval:string=llv[0];
    const lat:number=parseFloat(latval);
    console.log(lat)
    const longval:string=llv[1];
    const long:number=parseFloat(longval);
    console.log(long)



    console.log("Inside the right page ");
    console.log(props.RowNo);


    const setthedata=()=>{
        if(props.RowNo==0){
 
            return props.Row1Data;
        }
        else if(props.RowNo==1){

            return props.Row2Data;
        }
        else if(props.RowNo==2){
  
            return props.Row3Data;
        }
        else if(props.RowNo==3){

            return props.Row4Data;
        }
        else if(props.RowNo==4){
  
            return props.Row5Data;
        }
        else {
  
            return props.Row6Data;
        }
        
    }


    const dataToDisp:any=setthedata();

    useEffect(() => {
        dataToDisp;
      }, [props.RowNo]);

    const[mRight,setMRight]=useState(false);
    const handleMoveRight =(event: any) => {
        console.log(event.target);
        setMRight(true);
        setTimeout(() => {
            props.handleclick2();
          },200);
        
    }




      



  return (
    <motion.div className='RightOne'
    initial={{x:!mRight?'100vw':0}}
    animate={{x:!mRight?0:'100vw'}}
    transition={{duration:0.2}}

    > 
        <div className="mt-5">
        <div className='d-flex justify-content-between mt-3'>
            <div>
            <Button className='list' onClick={handleMoveRight}><img src='Images/chevron-left.svg'/>List</Button>
            </div>
            <div className='fs-3'>
            {dataToDisp.date}
            </div>
            <div>
            <Twitter city={props.city} region={props.region} date={dataToDisp.date} temp={dataToDisp.maxtemp} s={dataToDisp.status}/>
            
            
            </div>
        </div>
        </div>
        <Table striped>
      <tbody className='text-start'>
        <tr >
          <td >Status</td>
          <td>{dataToDisp.status}</td>
        </tr>
        <tr>
          <td>Max Temperature</td>
          <td>{dataToDisp.maxtemp}°F</td>
        </tr>
        <tr>
          <td>Min Temperature</td>
          <td>{dataToDisp.mintemp}°F</td>
        </tr>
        <tr>
          <td>Apparent Temperature</td>
          <td>{dataToDisp.apptemp}°F</td>
        </tr>
        <tr>
          <td>Sun Rise Time</td>
          <td>{dataToDisp.sunrise}</td>
        </tr>
        <tr>
          <td>Sun Set Time</td>
          <td>{dataToDisp.sunset}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td>{dataToDisp.humidity}%</td>
        </tr>
        <tr>
          <td>Wind Speed</td>
          <td>{dataToDisp.windspeed}mph</td>
        </tr>
        <tr>
          <td>Visibility</td>
          <td>{dataToDisp.visibility}mi</td>
        </tr>
        <tr>
          <td>Cloud Cover</td>
          <td>{dataToDisp.cloudcover}%</td>
        </tr>

      </tbody>
    </Table>
    <MapDisp lat={lat} long={long}/>
    </motion.div>
  )
}

export default Rightpage