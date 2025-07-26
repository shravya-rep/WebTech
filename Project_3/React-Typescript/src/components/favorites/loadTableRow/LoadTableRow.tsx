import React from 'react';
import Button from 'react-bootstrap/Button';

export interface FavrowData{
    favrows:any;
    favValsFromBE:(favdatasentback:string[])=>void;
    handleFavClick:(event: React.ChangeEvent<HTMLInputElement>) => void;

}

const LoadTableRow = (props:FavrowData) => {



    const callbackendGetData = async (event: any) => {
        console.log(event.target.value);
        const tosend:string=event.target.value;
        const url1:string="/loadacity?_id="+tosend;
        console.log(url1);
        const resp=await fetch(url1);
        const resp2= await resp.json();
        console.log(resp2);
        const favValsFromBE:string[]=[resp2[0].latlongval,resp2[0].city,resp2[0].state];
        console.log(favValsFromBE);
        props.favValsFromBE(favValsFromBE);

      }

      const deletebackendData = async (event:any) => {
        console.log("Inside deletebackendData");
        console.log(event.target.parentElement?.id);
        const tosend:(string|undefined)=event.target.parentElement?.id;
        const url1:string="/deletedata?_id="+tosend;
        console.log(url1);
        const resp=await fetch(url1);
        const resp2= await resp.json();
        console.log(resp2);
        props.handleFavClick(event);

        

        
      }

  return (
    <>
    { 
        props.favrows.map((Fav:any,index:number)=>{
            const{_id,city,state}=Fav;

            return (
                        <tbody>
                            <tr key={_id}>
                                <td>{index+1}</td>
                                <td><Button variant="link" onClick={callbackendGetData} value={_id} >{city}</Button></td>
                                <td><a href="#">{state}</a></td>
                                <td><Button variant="link" onClick={deletebackendData} id={_id}><img src='Images/trash3-fill.svg'/></Button></td>
                            </tr>
                        </tbody>


            )
        })
    }

    </>
  )
}

export default LoadTableRow