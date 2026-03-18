
import { useEffect } from 'react';
import { useState } from 'react';
import { neededData } from '../resultLayout/ResultLayout';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MapDisp from '../mapDisp/MapDisp';
import Twitter from '../twitter/Twitter';
import { motion } from 'framer-motion';
import './rightpage.css';


export interface datainRight {
    handleclick2: any;
    Row1Data: neededData | undefined;
    Row2Data: neededData | undefined;
    Row3Data: neededData | undefined;
    Row4Data: neededData | undefined;
    Row5Data: neededData | undefined;
    Row6Data: neededData | undefined;
    RowNo: number;
    ll: string;
    city: string;
    region: string;
    isCelsius: boolean;
    moonPhaseLabels: { [key: number]: string };
    precipTypeLabels: { [key: number]: string };
}

const Rightpage = (props: datainRight) => {

    const { isCelsius, moonPhaseLabels, precipTypeLabels } = props;
    const toC   = (f: number) => Math.round((f - 32) * 5 / 9 * 10) / 10;
    const dispT = (f: number) => isCelsius ? `${toC(f)}°C` : `${Math.round(f)}°F`;
    const dispW = (mph: number) => isCelsius ? `${Math.round(mph * 1.60934)} km/h` : `${Math.round(mph)} mph`;
    const dispV = (mi: number)  => isCelsius ? `${Math.round(mi * 1.60934)} km`   : `${Math.round(mi)} mi`;

    var ll: string = props.ll;
    var llv: string[] = ll.split(',');
    const lat: number = parseFloat(llv[0]);
    const long: number = parseFloat(llv[1]);

    const setthedata = () => {
        const rows = [props.Row1Data, props.Row2Data, props.Row3Data, props.Row4Data, props.Row5Data, props.Row6Data];
        return rows[props.RowNo] ?? props.Row1Data;
    }

    const dataToDisp: any = setthedata();

    useEffect(() => { dataToDisp; }, [props.RowNo]);

    const [mRight, setMRight] = useState(false);
    const handleMoveRight = (event: any) => {
        console.log(event.target);
        setMRight(true);
        setTimeout(() => { props.handleclick2(); }, 200);
    }

    return (
        <motion.div className='RightOne'
            initial={{ x: !mRight ? '100vw' : 0 }}
            animate={{ x: !mRight ? 0 : '100vw' }}
            transition={{ duration: 0.2 }}
        >
            <div className="mt-5">
                <div className='d-flex justify-content-between mt-3'>
                    <div>
                        <Button className='list' onClick={handleMoveRight}>
                            <img src='Images/chevron-left.svg' />List
                        </Button>
                    </div>
                    <div className='fs-3'>{dataToDisp.date}</div>
                    <div>
                        <Twitter city={props.city} region={props.region}
                            date={dataToDisp.date} temp={dataToDisp.maxtemp} s={dataToDisp.status} />
                    </div>
                </div>
            </div>

            <Table striped>
                <tbody className='text-start'>
                    <tr>
                        <td>Status</td>
                        <td>{dataToDisp.status}</td>
                    </tr>
                    <tr>
                        <td>Max Temperature</td>
                        <td>{dispT(dataToDisp.maxtemp)}</td>
                    </tr>
                    <tr>
                        <td>Min Temperature</td>
                        <td>{dispT(dataToDisp.mintemp)}</td>
                    </tr>
                    <tr>
                        <td>Apparent Temperature</td>
                        <td>{dispT(dataToDisp.apptemp)}</td>
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
                        <td>{dispW(dataToDisp.windspeed)}</td>
                    </tr>
                    <tr>
                        <td>Visibility</td>
                        <td>{dispV(dataToDisp.visibility)}</td>
                    </tr>
                    <tr>
                        <td>Cloud Cover</td>
                        <td>{dataToDisp.cloudcover}%</td>
                    </tr>
                    <tr>
                        <td>UV Index</td>
                        <td>{dataToDisp.uvindex}</td>
                    </tr>
                    <tr>
                        <td>Precipitation Probability</td>
                        <td>{dataToDisp.precipprob}%</td>
                    </tr>
                    <tr>
                        <td>Precipitation Type</td>
                        <td>{precipTypeLabels[dataToDisp.preciptype] ?? 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Moon Phase</td>
                        <td>{moonPhaseLabels[dataToDisp.moonphase] ?? '—'}</td>
                    </tr>
                </tbody>
            </Table>

            <MapDisp lat={lat} long={long} />
        </motion.div>
    );
}

export default Rightpage;
