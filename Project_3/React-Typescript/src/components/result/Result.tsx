import React from 'react';
export interface myVals{
    handleFavClick:(event: React.ChangeEvent<HTMLInputElement>) => void;
    favValsFromBE:(favdatasentback:string[])=>void;
    favArray:any;
    NoOfFavs:number;
    toshow:boolean;
    val:string;
    city:string;
    region:string;
};



export interface weatherArray{
    [key:number]:string[];
}[];

export interface getDatafunc{
    val:string;
    city:string;
    region:string;
    getDataFromChild:(dataObtained:any) => void;
}

function Result(){



    


    

   


    


    
      

    
  return (
    <div>
    </div>

  )
}

export default Result