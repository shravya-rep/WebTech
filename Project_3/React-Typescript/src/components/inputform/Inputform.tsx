import React, { useState, useEffect} from 'react';
import ResultLayout from '../resultLayout/ResultLayout';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Form, ListGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import "./inputform.css";
import Alert from 'react-bootstrap/Alert';





export interface FormValues {
  street : string;
  city : string;
  state : string;
  checkBox:boolean;
  callIP:boolean;
}

export interface FavArray{
  [index:number]:string;
}

export interface cityIDArray{
  id:number;
  value:string;
}


const Inputform = () => {


  const [values, setValues] = useState<FormValues>({
    street : '',
    city : '',
    state : '',
    checkBox:false,
    callIP:false
  });

  const [disabled,setDisabled]=useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [latlong, setLatLong] = useState('');
  const [city, setCity]=useState('');
  const [region, setRegion]=useState('');
  const[showResult,setShowResult]=useState(true);

  const[dispErroMsg1,setDispErrorMsg1]=useState(false);
  const[dispErroMsg2,setDispErrorMsg2]=useState(false);
  const[dispErroMsg3,setDispErrorMsg3]=useState(false);
  const[notValidStreet,setNotValidStreet]=useState(false);
  const[notValidCity,setNotValidCity]=useState(false);
  const[notValidState,setNotValidState]=useState(false);

  const[isChecked, setIsChecked] = useState(false);
  const[disButton,setDisButton]=useState(false);

  const[ipifno,setIPinfo]=useState(false);
  const[submitClicked,setSubmitClicked]=useState(false);
  const[favClicked,setFavClicked]=useState(false);

  const[googleError,setGoogleError]=useState(false);

  var stateResults:any=[
    { id: 1, value: 'Alabama' },
    { id: 2, value: 'Alaska' },
    { id: 3, value: 'Arizona' },
    { id: 4, value: 'Arkansas' },
    { id: 5, value: 'California' },
    { id: 6, value: 'Colorado' },
    { id: 7, value: 'Connecticut' },
    { id: 8, value: 'Delaware' },
    { id: 9, value: 'Florida' },
    { id: 10, value: 'Georgia' },
    { id: 11, value: 'Hawaii' },
    { id: 12, value: 'Idaho' },
    { id: 13, value: 'Illinois' },
    { id: 14, value: 'Indiana' },
    { id: 15, value: 'Iowa' },
    { id: 16, value: 'Kansas' },
    { id: 17, value: 'Kentucky' },
    { id: 18, value: 'Louisiana' },
    { id: 19, value: 'Maine' },
    { id: 20, value: 'Maryland' },
    { id: 21, value: 'Massachusetts' },
    { id: 22, value: 'Michigan' },
    { id: 23, value: 'Minnesota' },
    { id: 24, value: 'Mississippi' },
    { id: 25, value: 'Missouri' },
    { id: 26, value: 'Montana' },
    { id: 27, value: 'Nebraska' },
    { id: 28, value: 'Nevada' },
    { id: 29, value: 'New Hampshire' },
    { id: 30, value: 'New Jersey' },
    { id: 31, value: 'New Mexico' },
    { id: 32, value: 'New York' },
    { id: 33, value: 'North Carolina' },
    { id: 34, value: 'North Dakota' },
    { id: 35, value: 'Ohio' },
    { id: 36, value: 'Oklahoma' },
    { id: 37, value: 'Oregon' },
    { id: 38, value: 'Pennsylvania' },
    { id: 39, value: 'Rhode Island' },
    { id: 40, value: 'South Carolina' },
    { id: 41, value: 'South Dakota' },
    { id: 42, value: 'Tennessee' },
    { id: 43, value: 'Texas' },
    { id: 44, value: 'Utah' },
    { id: 45, value: 'Vermont' },
    { id: 46, value: 'Virginia' },
    { id: 47, value: 'Washington' },
    { id: 48, value: 'West Virginia' },
    { id: 49, value: 'Wisconsin' },
    { id: 50, value: 'Wyoming' }
  ]

  





  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    console.log(name);
    console.log(value);
    console.log(values.checkBox);
    if(name=='checkBox'){
      console.log("Entered")
      setDisabled(!disabled);
    }
  
  }

  const[cityArray,setCityArray]=useState<cityIDArray[]>();
  var cityResults:any=[];
  const handleChangeCity=async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    const url1:string="/autocomplete?cityval="+value;
    try{
      const resp4=await fetch(url1);
      const respfinal=await resp4.json();
      console.log(respfinal);
      console.log(Object.entries(respfinal.predictions).length);
      
      for(var i=0;i<Object.entries(respfinal.predictions).length;i++)
      {
        cityResults.push({id:i,value:respfinal.predictions[i].terms[0].value});
      }
      console.log(cityResults);
      setCityArray(cityResults);

    }
    catch(error){
      console.log(error);

    }


  }
  const[wantToselect1,setwantToselect1]=useState(true);
  const[isCitySelected,SetIsCitySelected]=useState(false);
  const onCitySelected=(selectedCity:any)=>{
    console.log(selectedCity);
    setValues({ ...values, city: selectedCity });
    SetIsCitySelected(true);
    setwantToselect1(false);
  }
  

  const[stateArray,setStateArray]=useState<cityIDArray[]>();
  const handleChangeState=async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setStateArray(stateResults);
  }

  const[wantToselect2,setwantToselect2]=useState(true);
  const[isStateSelected,SetIsStateSelected]=useState(false);
  const onStateSelected=(selectedState:any)=>{
    console.log(selectedState);
    setValues({ ...values, state: selectedState });
    SetIsStateSelected(true);
    setwantToselect2(false);
  }




  const printSomething=()=>{
    console.log("Not in focus city");
    setwantToselect1(false);
    setwantToselect2(false);
  }



    

  useEffect(() => {setDisButton((values.street.trim() !== '' && values.city.trim() !== ''&& values.state.trim() !== '')||(isChecked&&ipifno));
  }, [values.street, values.city,values.state,isChecked,ipifno]);

  useEffect(() => {setDispErrorMsg1(values.street.trim() !== ''||notValidStreet);},[values.street]);
  useEffect(() => {setDispErrorMsg2(values.city.trim() !== ''||notValidCity);},[values.city]);
  useEffect(() => {setDispErrorMsg3(values.city.trim() !== ''||notValidCity);},[values.state]);


  const checkIfComplete=(event: any)=>{
    const { name, value } = event.target;
    console.log(value);
    if(name=='street'){
      if(values.street.trim()== ''&&clickedState)
        {
          setNotValidStreet(true);
        }
    
      }
      if(name=='city'){
        console.log("Entered city");
        console.log(wantToselect1);
        if(values.city.trim()==''&&clickedState2)
        {
          setNotValidCity(true);

        }
        if(values.city.trim()!=''&&clickedState2&&!wantToselect1)
          {
            console.log("entered the logic")
            SetIsCitySelected(!isCitySelected);
  
          }
      }

      if(name=='state'){
        console.log("Entered state");
        if(values.state.trim()==''&&clickedState3)
        {
          setNotValidState(true);

        }
        
        
        console.log(values.state.trim()!='');
        console.log(clickedState3);
        console.log(!wantToselect2);
        if(values.state.trim()!=''&&clickedState3&&!wantToselect2)
          {
            console.log("entered the logic for state ")
            SetIsStateSelected(!isStateSelected);
  
          }
      }

    }



  const[clickedState,setClickedState ]=useState(false);

  const doSomething=(event: React.MouseEvent<HTMLInputElement>)=>{
    console.log(event.target);
    setClickedState(true);
  }

  const[clickedState2,setClickedState2 ]=useState(false);

  const doSomething2=(event: React.MouseEvent<HTMLInputElement>)=>{
    console.log(event.target);
    setClickedState2(true);
  }

  const[clickedState3,setClickedState3 ]=useState(false);

  const doSomething3=(event: React.MouseEvent<HTMLInputElement>)=>{
    console.log(event.target);
    setClickedState3(true);
  }





  const handleCheck=async (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
    setValues({ ...values, checkBox: event.target.checked});
    console.log(values);
    setDisabled(!disabled);

     console.log("Inside firstone");
      const initialURLipinfo="https://ipinfo.io/?token="
      const TOKENID="7aafc6aef32e53";
      const URLipinfo=initialURLipinfo.concat(TOKENID);
      console.log(URLipinfo);
      try {
        const response = await fetch(URLipinfo);
        const jsonData = await response.json();
        const location=jsonData.loc;
        console.log(location);
        setLatLong(location);
        console.log(latlong);
        setCity(jsonData.city);
        setRegion(jsonData.region);
        setIPinfo(true);

      }
      catch(error){
        console.log(error);
      }
  }




  




  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitClicked(true);
    setShowComponent(true);
    setShowResult(true);
    console.log(values);
    console.log(event.target);
    console.log("inside submit");
    console.log(values.checkBox);

    if(!values.checkBox){
      console.log("Inside secondone");
      console.log(values.street);
      console.log(values.city);
      console.log(values.state);
      var st:string=values.street;
      var finalSt:string=st.replaceAll(" ", "+");
      var cty:string=values.city;
      var finalCity:string=cty.replaceAll(" ","+");
      console.log(finalSt);

      const APIKEY = "AIzaSyDIOoQ8sIRAi7O9s-xQtWpowOWf9x-zkJQ";
      const initialURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
      const URL = initialURL.concat(finalSt, "+", finalCity, "+", values.state, "&key=", APIKEY);
      console.log(URL)
      try{
        const response = await fetch(URL);
        const jsonData = await response.json();
        console.log(jsonData);
        const location=jsonData.results[0].geometry.location;
        var lat2:number=location.lat;
        var lng2:number=location.lng;
        var finallat:string=lat2.toString();
        var finallng:string=lng2.toString();
        var finalres:string=finallat+","+finallng;
        console.log(finalres);
        setLatLong(finalres);
        setCity(values.city);
        setRegion(values.state);

      }
      catch(error){
        console.log(error);
        setGoogleError(true);

      }

      

    }
    
    console.log(latlong);




    
    
   
  
  }

  const favValsFromBE= (favdatasentback:string[])=>{
    setShowResult(true);
    setShowComponent(true);
    console.log(favdatasentback);
    setLatLong(favdatasentback[0]);
    setCity(favdatasentback[1]);
    setRegion(favdatasentback[2]);

    setFavClicked(true);

  }

  const[ResButton,setResButton]=useState(true);
  const[favButton,setFavButton]=useState(false);
  const handleResultClick = async (event: any) => {
    console.log(event.target);
    setResButton(true);
    setFavButton(false);
    console.log(showResult);

    if(submitClicked||favClicked)
    {
      setShowComponent(true);
      setShowResult(true);
    }
    else{
      if(!showResult&&showComponent){
        setShowComponent(false);
        setShowResult(false);
      }
      else{
        setShowComponent(false);
        setShowResult(true);

      }

    }



  }

  const[NoOfFavs,setNoOfFavs]=useState(-1);
  const [favArray,setFavArray]=useState();


  const handleFavClick= async (event: any) => {
    console.log(event.target);
    setNoOfFavs(-1);
    console.log("Inside handleFavClick");

    setFavButton(true);
    setResButton(false);
    setShowResult(false);
    setShowComponent(true);
    const getDataURL1:string="/loaddata";
    try{
      const resp=await fetch(getDataURL1);
      const resp2= await resp.json();
      console.log(resp2[0]);
      console.log(resp2.length);
      setNoOfFavs(resp2.length);
      setFavArray(resp2);
    }
    catch(error){
      console.log(error);
    }
  }


  const clearall=async (event: any) => {
    console.log(event.target);
    setValues({    
      street : '',
      city : '',
      state : '',
      checkBox:false,
      callIP:false});
      setDisButton(false);
      setShowResult(false);
      setShowComponent(false);
      setDisabled(false);

      setLatLong('');
      setCity('');
      setRegion('');
      setDispErrorMsg1(false);
      setDispErrorMsg2(false);
      setDispErrorMsg3(false);
      setNotValidStreet(false);
      setNotValidCity(false);
      setNotValidState(false);
      setIsChecked(false);
      setFavClicked(false);
      setIPinfo(false);
      setClickedState(false);
      setClickedState2(false);
      setClickedState3(false);

      setwantToselect1(true);
      SetIsCitySelected(false);

      setwantToselect2(true);
      SetIsStateSelected(false);
      setCityArray(undefined);
      setStateArray(undefined);
      setGoogleError(false);
      setResButton(true);
      setFavButton(false);



    
  }






  
  return (
    <div className='startpage'>
    <div className='bg'>
 
        <div className="fs-2">Weather Search<span>⛅</span></div>
    <Form className="inputDetails" style={{ paddingLeft:10 }} onSubmit={handleSubmit}>
    <Form.Group as={Row} className="data" controlId="formStreet">
      <Form.Label column sm={2}>
       Street<span style={{color:'red'}}>*</span>
      </Form.Label>
      <Col sm={9}>
        <Form.Control 
        type="text" 
        name="street"
        value={values.street} 
        disabled={disabled}
        onChange={handleChange}
        onClick={doSomething}
        onFocus={checkIfComplete}
        onMouseOut={printSomething}
        isInvalid={!dispErroMsg1&&notValidStreet}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid street
        </Form.Control.Feedback>
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="data"controlId="formCity">
      <Form.Label column sm={2}>
      City<span style={{color:'red'}}>*</span>
      </Form.Label>
      <Col sm={9}>
        <Form.Control type="text" 
        name="city"
        value={values.city}
        required
        autoComplete="off"
        disabled={disabled}
        onChange={handleChangeCity}
        onClick={doSomething2}
        onFocus={checkIfComplete}
        onMouseOut={printSomething}
        isInvalid={!dispErroMsg2&&notValidCity}
        />

        <ListGroup style={{zIndex:6, position:'absolute',width:'20rem'}}className='typeahead-list-group'>
          {!isCitySelected&&(cityArray!=undefined)&&
          cityArray.map(Fav => (
          <ListGroup.Item key={Fav.id} className='typeahead-list-group-item' onClick={()=>onCitySelected(Fav.value)}>
              {Fav.value}
          </ListGroup.Item>

          ))}
        </ListGroup>

        <Form.Control.Feedback type="invalid">
          Please enter a valid city
        </Form.Control.Feedback>

      </Col>
    </Form.Group>

          
    <Form.Group as={Row} className="data"controlId="formState">
      <Form.Label column sm={2}>
     State<span style={{color:'red'}}>*</span>
      </Form.Label>
      <Col sm={3}>
        <Form.Control type="text" 
        name="state"
        value={values.state}
        required
        autoComplete="off"
        disabled={disabled}
        onChange={handleChangeState}
        onClick={doSomething3}
        onFocus={checkIfComplete}
        placeholder='Select your state'
        isInvalid={!dispErroMsg3&&notValidState}
        />

        <ListGroup className='list-group overflow-auto shadow' style={{maxHeight:'300px', width:'20rem', zIndex:5, position:'absolute'}}>
          {!isStateSelected&&(stateArray!=undefined)&&
          stateArray.map(Fav => (
          <ListGroup.Item key={Fav.id} className='typeahead-list-group-item' onClick={()=>onStateSelected(Fav.value)}>
              {Fav.value}
          </ListGroup.Item>

          ))}
        </ListGroup>

        <Form.Control.Feedback type="invalid">
        </Form.Control.Feedback>

      </Col>
    </Form.Group>


    <hr className="hr" />

    <div className='container d-flex justify-content-center'>
    <Form.Group className="mb-1" controlId="formCheck">
      <div style={{display:'inline-flex'}}>
    <Form.Label>
      Autodetect Location<span>*</span>
    </Form.Label>
      <Col>
        <Form.Check label="Current Location"
        name='checkBox'
        checked={isChecked}
        onChange={handleCheck} />
      </Col>
      </div>
    </Form.Group>
    </div>
    
    <div className='container d-flex justify-content-center'>
    <Form.Group as={Row} className="mb-1">
      <Col >
        <Button className="btn btn-primary" disabled={!disButton} id="submit" type="submit"><img src='Images/search.svg' />Search</Button>
        <Button className="clearButton" onClick={clearall}> <img src='Images/list-nested.svg' />Clear</Button>
      </Col>

    </Form.Group>
    </div>
  </Form>
  </div>
    
  <div className='container d-flex justify-content-center mt-3 gap-3'>
    {ResButton?<Button variant="primary" onClick={handleResultClick}>Results</Button>:<Button className="ResButton" onClick={handleResultClick}>Results</Button>}
    {!favButton?<Button className="favButton"onClick={handleFavClick}> Favourites</Button>:<Button variant="primary" onClick={handleFavClick}> Favourites</Button>}
    </div>
    {googleError?<div>
            <Alert variant="danger">
            An error occured. Please try again later.
            </Alert>
            </div>:
    showComponent&&<ResultLayout handleFavClick={handleFavClick} favValsFromBE={favValsFromBE} favArray={favArray} NoOfFavs={NoOfFavs} toshow={showResult} val={latlong} city={city} region={region}/>}
  </div>


  )
}

export default Inputform