import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './twitter.css';

export interface tweetdata{
    city:string;
    region:string;
    date:string;
    temp:number;
    s:string;
}


const Twitter = (props:tweetdata) => {
    console.log(props.city);
    console.log(props.region);
    console.log(props.date);
    console.log(props.temp);
    console.log(props.s);
    const tweetCity:string=props.city;
    const tweetRegion:string=props.region;
    const tweetDay:string=props.date;
    const tweetTemp:number=props.temp;
    const tweetStatus:string=props.s;

    const URL:string="https://twitter.com/intent/tweet?text="+"The temperature in "+tweetCity+", "+tweetRegion+" on "+tweetDay+" is "+tweetTemp+"°F and the conditions are "+tweetStatus+"&hashtags="+"CSCI571WeatherForecast";

    const [tweetURL,setTweetURL]=useState('');
    

    useEffect(() => {
        setTweetURL(URL);
      }, [props]);
    


  return (
    <div><Button className='tweet'><a className="twitter-share-button"
    href={tweetURL} target="_blank"><img src='Images/twitter-x.svg'/></a></Button></div>
  )
}

export default Twitter