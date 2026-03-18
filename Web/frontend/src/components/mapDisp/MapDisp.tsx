
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export interface trial{
    lat:number;
    long:number;
}
const MapDisp = (props:trial) => {

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: 400, width: '100%' }}
        zoom={13}
        center={{ lat: props.lat, lng: props.long }}
      >
        <Marker position={{ lat: props.lat, lng: props.long }} />
      </GoogleMap>
    </LoadScript>
  )
}

export default MapDisp
