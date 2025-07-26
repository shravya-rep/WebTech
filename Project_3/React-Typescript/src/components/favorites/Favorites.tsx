import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import LoadTableRow from './loadTableRow/LoadTableRow';


interface FavInputData{
    favArray:any;
    NoOfFavs:number;
    favValsFromBE:(favdatasentback:string[])=>void;
    handleFavClick:(event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Favorites = (props:FavInputData) => {
    console.log("inside Fav page");
    console.log(props.NoOfFavs);
    console.log(props.favArray);
        return (
            <div>
                {props.favArray==0?
                <Alert variant="warning">
                Sorry.No records found.
                </Alert>:props.favArray!=undefined?
                <Table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>City</th>
                  <th>State</th>
                  <th></th>
                </tr>
              </thead>

              <LoadTableRow handleFavClick={props.handleFavClick} favValsFromBE={props.favValsFromBE} favrows={props.favArray}/>

              </Table>:<div></div>
}

            </div>

          )
}

export default Favorites