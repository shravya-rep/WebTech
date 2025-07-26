
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';

export interface trial{
    lat:number;
    long:number;
}
const MapDisp = (props:trial) => {
    console.log('INNNNNNNNNNNNNNNNNNNNNNN MAAAAAAAAAAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPP');

  return (

    <APIProvider apiKey={'AIzaSyDIOoQ8sIRAi7O9s-xQtWpowOWf9x-zkJQ'} onLoad={() => console.log('Maps API has loaded.')}>
    <Map 
      style={{ height: 400, width: '100%' }}
      defaultZoom={13}
      center={{lat: props.lat, lng: props.long}} />
      <Marker position={{lat: props.lat, lng: props.long}} />
  </APIProvider>

  )
}

export default MapDisp