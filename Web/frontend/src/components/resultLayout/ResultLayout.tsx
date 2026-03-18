
import { useState, useEffect, useRef } from 'react';
import { myVals } from '../result/Result.tsx';
import Rightpage from '../rightpage/Rightpage.tsx';
import ProgressBar from './Progressbar.tsx';
import Table from 'react-bootstrap/Table';
import Favorites from '../favorites/Favorites.tsx';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Chart1, { graphVals } from '../chart1/Chart1.tsx';
import Chart2 from '../chart2/Chart2.tsx';
import CurrentConditions from '../currentConditions/CurrentConditions.tsx';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import './resultLayout.css';


export interface neededData {
    date: string;
    status: string;
    maxtemp: number;
    mintemp: number;
    apptemp: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    windspeed: number;
    visibility: number;
    cloudcover: number;
    uvindex: number;
    precipprob: number;
    preciptype: number;
    moonphase: number;
}

export interface weatherArray {
    [key: number]: string[];
}[];


const ResultLayout = (props: myVals) => {

    const [moveLeft, setmoveLeft] = useState(false);
    const [moveRight, setmoveRight] = useState(false);
    const [flag, setFlag] = useState(true);
    const [isCelsius, setIsCelsius] = useState(false);

    const handleClick1 = (event: any) => {
        console.log(event.target);
        setmoveLeft(true);
        setTimeout(() => { setFlag(!flag); }, 200);
    }

    const handleClick2 = () => {
        setmoveLeft(false);
        setmoveRight(true);
        setFlag(true);
    }

    var ll: string = props.val;
    var llv: string[] = ll.split(',');
    const latval: string = llv[0];
    const longval: string = llv[1];

    const weather: weatherArray = {
        1000: ["Clear, Sunny", "Images/clear_day.svg"],
        1100: ["Mostly Clear", "Images/mostly_clear_day.svg"],
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
        6201: ["Heavy Freezing Rain", "Images/freezing_rain_heavy.svg"],
        4200: ["Light Rain", "Images/rain_light.svg"],
        4001: ["Rain", "Images/rain.svg"],
        4201: ["Heavy Rain", "Images/rain_heavy.svg"]
    };

    const moonPhaseLabels: { [key: number]: string } = {
        0: 'New Moon', 1: 'Waxing Crescent', 2: 'First Quarter',
        3: 'Waxing Gibbous', 4: 'Full Moon', 5: 'Waning Gibbous',
        6: 'Third Quarter', 7: 'Waning Crescent'
    };

    const precipTypeLabels: { [key: number]: string } = {
        0: 'N/A', 1: 'Rain', 2: 'Snow', 3: 'Freezing Rain', 4: 'Ice Pellets'
    };

    // unit helpers
    const toC = (f: number) => Math.round((f - 32) * 5 / 9 * 10) / 10;
    const displayTemp = (f: number) => isCelsius ? `${toC(f)}°C` : `${Math.round(f)}°F`;
    const displayWind = (mph: number) => isCelsius ? `${Math.round(mph * 1.60934)} km/h` : `${Math.round(mph)} mph`;

    // daily state
    const [dailyWCOne,   setDailyWCOne]   = useState('');
    const [dailyWCTwo,   setDailyWCTwo]   = useState('');
    const [dailyWCThree, setDailyWCThree] = useState('');
    const [dailyWCFour,  setDailyWCFour]  = useState('');
    const [dailyWCFive,  setDailyWCFive]  = useState('');
    const [dailyWCSix,   setDailyWCSix]   = useState('');

    const [imageSrcOne,   setImageSrcOne]   = useState('clear_day.svg');
    const [imageSrcTwo,   setImageSrcTwo]   = useState('clear_day.svg');
    const [imageSrcThree, setImageSrcThree] = useState('clear_day.svg');
    const [imageSrcFour,  setImageSrcFour]  = useState('clear_day.svg');
    const [imageSrcFive,  setImageSrcFive]  = useState('clear_day.svg');
    const [imageSrcSix,   setImageSrcSix]   = useState('clear_day.svg');

    const [dailydateOne,   setDailydateOne]   = useState('');
    const [dailydateTwo,   setDailydateTwo]   = useState('');
    const [dailydateThree, setDailydateThree] = useState('');
    const [dailydateFour,  setDailydateFour]  = useState('');
    const [dailydateFive,  setDailydateFive]  = useState('');
    const [dailydateSix,   setDailydateSix]   = useState('');

    const [dailyTempHighOne,   setDailyTempHighOne]   = useState(0);
    const [dailyTempHighTwo,   setDailyTempHighTwo]   = useState(0);
    const [dailyTempHighThree, setDailyTempHighThree] = useState(0);
    const [dailyTempHighFour,  setDailyTempHighFour]  = useState(0);
    const [dailyTempHighFive,  setDailyTempHighFive]  = useState(0);
    const [dailyTempHighSix,   setDailyTempHighSix]   = useState(0);

    const [dailyTempLowOne,   setDailyTempLowOne]   = useState(0);
    const [dailyTempLowTwo,   setDailyTempLowTwo]   = useState(0);
    const [dailyTempLowThree, setDailyTempLowThree] = useState(0);
    const [dailyTempLowFour,  setDailyTempLowFour]  = useState(0);
    const [dailyTempLowFive,  setDailyTempLowFive]  = useState(0);
    const [dailyTempLowSix,   setDailyTempLowSix]   = useState(0);

    const [dailyWSOne,   setDailyWSOne]   = useState(0);
    const [dailyWSTwo,   setDailyWSTwo]   = useState(0);
    const [dailyWSThree, setDailyWSThree] = useState(0);
    const [dailyWSFour,  setDailyWSFour]  = useState(0);
    const [dailyWSFive,  setDailyWSFive]  = useState(0);
    const [dailyWSSix,   setDailyWSSix]   = useState(0);

    const [precipProbOne,   setPrecipProbOne]   = useState(0);
    const [precipProbTwo,   setPrecipProbTwo]   = useState(0);
    const [precipProbThree, setPrecipProbThree] = useState(0);
    const [precipProbFour,  setPrecipProbFour]  = useState(0);
    const [precipProbFive,  setPrecipProbFive]  = useState(0);
    const [precipProbSix,   setPrecipProbSix]   = useState(0);

    const [showData, setShowData] = useState(false);
    const [currentHourData, setCurrentHourData] = useState<any>(null);

    // raw temp data stored for unit toggle recalculation
    const rawTempRef = useRef<{ time: number; low: number; high: number }[]>([]);

    const [datapassed, setDatapassed] = useState<graphVals>({
        dataValsArray1: [0, 0, 0],
        dataValsArray2: [0, 0, 0],
        dataValsArray3: [0, 0, 0],
        dataValsArray4: [0, 0, 0],
        dataValsArray5: [0, 0, 0],
        dataValsArray6: [0, 0, 0],
        celsius: false
    });

    const [chooseRow, setChooseRow] = useState(0);
    const [Row1Data, setRow1Data] = useState<neededData>();
    const [Row2Data, setRow2Data] = useState<neededData>();
    const [Row3Data, setRow3Data] = useState<neededData>();
    const [Row4Data, setRow4Data] = useState<neededData>();
    const [Row5Data, setRow5Data] = useState<neededData>();
    const [Row6Data, setRow6Data] = useState<neededData>();

    const [result, setResult] = useState();

    const fetchData = async () => {
        try {
            const API = import.meta.env.VITE_API_URL || '';
            const finalURL = `${API}/processdata?lat=${latval}&long=${longval}`;
            const response = await fetch(finalURL);
            const resp2 = await response.json();

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

            setPrecipProbOne(resp2.data.timelines[0].intervals[0].values.precipitationProbability);
            setPrecipProbTwo(resp2.data.timelines[0].intervals[1].values.precipitationProbability);
            setPrecipProbThree(resp2.data.timelines[0].intervals[2].values.precipitationProbability);
            setPrecipProbFour(resp2.data.timelines[0].intervals[3].values.precipitationProbability);
            setPrecipProbFive(resp2.data.timelines[0].intervals[4].values.precipitationProbability);
            setPrecipProbSix(resp2.data.timelines[0].intervals[5].values.precipitationProbability);

            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const finalDate: string[] = [];
            for (var ndays: number = 0; ndays < 6; ndays++) {
                const d = new Date(resp2.data.timelines[0].intervals[ndays].startTime);
                finalDate[ndays] = day[d.getDay()].concat(", ", month[d.getMonth()], ". ", d.getDate().toString(), ", ", d.getFullYear().toString());
            }
            setDailydateOne(finalDate[0]);
            setDailydateTwo(finalDate[1]);
            setDailydateThree(finalDate[2]);
            setDailydateFour(finalDate[3]);
            setDailydateFive(finalDate[4]);
            setDailydateSix(finalDate[5]);

            setDailyWCOne(weather[resp2.data.timelines[0].intervals[0].values.weatherCode][0]);
            setDailyWCTwo(weather[resp2.data.timelines[0].intervals[1].values.weatherCode][0]);
            setDailyWCThree(weather[resp2.data.timelines[0].intervals[2].values.weatherCode][0]);
            setDailyWCFour(weather[resp2.data.timelines[0].intervals[3].values.weatherCode][0]);
            setDailyWCFive(weather[resp2.data.timelines[0].intervals[4].values.weatherCode][0]);
            setDailyWCSix(weather[resp2.data.timelines[0].intervals[5].values.weatherCode][0]);

            setImageSrcOne(weather[resp2.data.timelines[0].intervals[0].values.weatherCode][1]);
            setImageSrcTwo(weather[resp2.data.timelines[0].intervals[1].values.weatherCode][1]);
            setImageSrcThree(weather[resp2.data.timelines[0].intervals[2].values.weatherCode][1]);
            setImageSrcFour(weather[resp2.data.timelines[0].intervals[3].values.weatherCode][1]);
            setImageSrcFive(weather[resp2.data.timelines[0].intervals[4].values.weatherCode][1]);
            setImageSrcSix(weather[resp2.data.timelines[0].intervals[5].values.weatherCode][1]);

            const sunrise: string[] = [];
            const sunset: string[] = [];
            for (var ndays: number = 0; ndays < 6; ndays++) {
                const fmtTime = (val: string) => {
                    const s = new Date(val).toLocaleTimeString();
                    return s.slice(0, 4).concat(s.slice(8));
                };
                sunrise[ndays] = fmtTime(resp2.data.timelines[0].intervals[ndays].values.sunriseTime);
                sunset[ndays]  = fmtTime(resp2.data.timelines[0].intervals[ndays].values.sunsetTime);
            }

            const makeRow = (i: number): neededData => ({
                date:       finalDate[i],
                status:     weather[resp2.data.timelines[0].intervals[i].values.weatherCode][0],
                maxtemp:    resp2.data.timelines[0].intervals[i].values.temperatureMax,
                mintemp:    resp2.data.timelines[0].intervals[i].values.temperatureMin,
                apptemp:    resp2.data.timelines[0].intervals[i].values.temperatureApparent,
                sunrise:    sunrise[i],
                sunset:     sunset[i],
                humidity:   resp2.data.timelines[0].intervals[i].values.humidity,
                windspeed:  resp2.data.timelines[0].intervals[i].values.windSpeed,
                visibility: resp2.data.timelines[0].intervals[i].values.visibility,
                cloudcover: resp2.data.timelines[0].intervals[i].values.cloudCover,
                uvindex:    resp2.data.timelines[0].intervals[i].values.uvIndex,
                precipprob: resp2.data.timelines[0].intervals[i].values.precipitationProbability,
                preciptype: resp2.data.timelines[0].intervals[i].values.precipitationType,
                moonphase:  resp2.data.timelines[0].intervals[i].values.moonPhase,
            });
            setRow1Data(makeRow(0));
            setRow2Data(makeRow(1));
            setRow3Data(makeRow(2));
            setRow4Data(makeRow(3));
            setRow5Data(makeRow(4));
            setRow6Data(makeRow(5));

            // chart data (raw °F — converted on toggle)
            const timeArray: number[] = [];
            const templowArray: number[] = [];
            const temphighArray: number[] = [];
            for (var ndays: number = 0; ndays < 6; ndays++) {
                timeArray[ndays]     = new Date(resp2.data.timelines[0].intervals[ndays].startTime).getTime();
                templowArray[ndays]  = resp2.data.timelines[0].intervals[ndays].values.temperatureMin;
                temphighArray[ndays] = resp2.data.timelines[0].intervals[ndays].values.temperatureMax;
            }
            rawTempRef.current = timeArray.map((t, i) => ({ time: t, low: templowArray[i], high: temphighArray[i] }));
            const cv = (f: number) => isCelsius ? Math.round((f - 32) * 5 / 9 * 10) / 10 : f;
            setDatapassed({
                dataValsArray1: [timeArray[0], cv(templowArray[0]), cv(temphighArray[0])],
                dataValsArray2: [timeArray[1], cv(templowArray[1]), cv(temphighArray[1])],
                dataValsArray3: [timeArray[2], cv(templowArray[2]), cv(temphighArray[2])],
                dataValsArray4: [timeArray[3], cv(templowArray[3]), cv(temphighArray[3])],
                dataValsArray5: [timeArray[4], cv(templowArray[4]), cv(temphighArray[4])],
                dataValsArray6: [timeArray[5], cv(templowArray[5]), cv(temphighArray[5])],
                celsius: isCelsius
            });

            // find closest hourly interval to now for current conditions card
            const now = Date.now();
            const hourly = resp2.data.timelines[1].intervals;
            let currentIdx = 0;
            for (let i = 0; i < hourly.length; i++) {
                if (new Date(hourly[i].startTime).getTime() <= now) currentIdx = i;
                else break;
            }
            setCurrentHourData(hourly[currentIdx]);

            setResult(resp2);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (props.val) {
            fetchData();
            setChangeColor(false);
            setFavId('');
        }
    }, [props.val]);

    useEffect(() => {
        setShowData(dailyTempLowSix != 0);
    }, [dailyTempLowSix]);

    // recompute chart data when unit toggles
    useEffect(() => {
        if (rawTempRef.current.length === 6) {
            const c = (f: number) => isCelsius ? Math.round((f - 32) * 5 / 9 * 10) / 10 : f;
            const d = rawTempRef.current;
            setDatapassed({
                dataValsArray1: [d[0].time, c(d[0].low), c(d[0].high)],
                dataValsArray2: [d[1].time, c(d[1].low), c(d[1].high)],
                dataValsArray3: [d[2].time, c(d[2].low), c(d[2].high)],
                dataValsArray4: [d[3].time, c(d[3].low), c(d[3].high)],
                dataValsArray5: [d[4].time, c(d[4].low), c(d[4].high)],
                dataValsArray6: [d[5].time, c(d[5].low), c(d[5].high)],
                celsius: isCelsius
            });
        }
    }, [isCelsius]);

    const passVal1 = (event: any) => { console.log(event.target); setChooseRow(0); setFlag(!flag); }
    const passVal2 = (event: any) => { console.log(event.target); setChooseRow(1); setFlag(!flag); }
    const passVal3 = (event: any) => { console.log(event.target); setChooseRow(2); setFlag(!flag); }
    const passVal4 = (event: any) => { console.log(event.target); setChooseRow(3); setFlag(!flag); }
    const passVal5 = (event: any) => { console.log(event.target); setChooseRow(4); setFlag(!flag); }
    const passVal6 = (event: any) => { console.log(event.target); setChooseRow(5); setFlag(!flag); }

    const [changeColor, setChangeColor] = useState(false);
    const [favId, setFavId] = useState('');

    const handleAddToFav = async (event: any) => {
        console.log(event.target);
        const API = import.meta.env.VITE_API_URL || '';
        if (changeColor && favId) {
            await fetch(`${API}/deletedata?_id=${favId}`);
            setChangeColor(false);
            setFavId('');
        } else {
            const url = `${API}/storedata?latlongval=${props.val}&city=${props.city}&state=${props.region}`;
            const resp = await fetch(url);
            const resp2 = await resp.json();
            if (resp2._id) setFavId(resp2._id);
            setChangeColor(true);
        }
    }

    return (
        <AnimatePresence>
            <div>
                {props.toshow ?
                    props.val == '' || (!showData) ?
                        <div><ProgressBar /></div> :
                        flag ?
                            <motion.div className='LeftOne'
                                initial={{ x: moveRight ? '-100vw' : 0 }}
                                animate={{ x: moveLeft ? '-100vw' : 0 }}
                                transition={{ duration: moveLeft ? 0.2 : 0.1 }}
                            >
                                {/* Current conditions card */}
                                {currentHourData && (
                                    <CurrentConditions
                                        city={props.city}
                                        region={props.region}
                                        data={currentHourData}
                                        weather={weather}
                                        isCelsius={isCelsius}
                                    />
                                )}

                                {/* Forecast header row */}
                                <div className='container d-flex justify-content-between align-items-center mt-3'>
                                    <h4>Forecast at {props.city}, {props.region}</h4>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <Button variant="outline-secondary" size="sm"
                                            onClick={() => setIsCelsius(!isCelsius)}>
                                            {isCelsius ? '°C → °F' : '°F → °C'}
                                        </Button>
                                        <Button className="favs" onClick={handleAddToFav}>
                                            {!changeColor
                                                ? <img src='Images/star.svg' height={20} width={20} />
                                                : <img src='Images/star-fill.svg' height={20} width={20} />}
                                        </Button>
                                        <Button variant="link" style={{ color: '#000000' }} onClick={handleClick1}>Details</Button>
                                        <img src='Images/chevron-right.svg' />
                                    </div>
                                </div>

                                <div style={{ marginTop: 16 }}>
                                    <Tabs defaultActiveKey="dayview" id="uncontrolled-tab-example" className="nav-item ms-auto">
                                        <Tab eventKey="dayview" title="Day View">
                                            <div className='mytable'>
                                                <Table responsive="sm" style={{ marginLeft: -8 }} hover>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                            <th>High</th>
                                                            <th>Low</th>
                                                            <th>Wind</th>
                                                            <th>Rain (%)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr onClick={passVal1}>
                                                            <td>1</td>
                                                            <td><Button variant='link'>{dailydateOne}</Button></td>
                                                            <td><img src={imageSrcOne} alt="" height={50} width={50} />{dailyWCOne}</td>
                                                            <td>{displayTemp(dailyTempHighOne)}</td>
                                                            <td>{displayTemp(dailyTempLowOne)}</td>
                                                            <td>{displayWind(dailyWSOne)}</td>
                                                            <td>{precipProbOne}%</td>
                                                        </tr>
                                                        <tr onClick={passVal2}>
                                                            <td>2</td>
                                                            <td><Button variant='link'>{dailydateTwo}</Button></td>
                                                            <td><img src={imageSrcTwo} alt="" height={50} width={50} />{dailyWCTwo}</td>
                                                            <td>{displayTemp(dailyTempHighTwo)}</td>
                                                            <td>{displayTemp(dailyTempLowTwo)}</td>
                                                            <td>{displayWind(dailyWSTwo)}</td>
                                                            <td>{precipProbTwo}%</td>
                                                        </tr>
                                                        <tr onClick={passVal3}>
                                                            <td>3</td>
                                                            <td><Button variant='link'>{dailydateThree}</Button></td>
                                                            <td><img src={imageSrcThree} alt="" height={50} width={50} />{dailyWCThree}</td>
                                                            <td>{displayTemp(dailyTempHighThree)}</td>
                                                            <td>{displayTemp(dailyTempLowThree)}</td>
                                                            <td>{displayWind(dailyWSThree)}</td>
                                                            <td>{precipProbThree}%</td>
                                                        </tr>
                                                        <tr onClick={passVal4}>
                                                            <td>4</td>
                                                            <td><Button variant='link'>{dailydateFour}</Button></td>
                                                            <td><img src={imageSrcFour} alt="" height={50} width={50} />{dailyWCFour}</td>
                                                            <td>{displayTemp(dailyTempHighFour)}</td>
                                                            <td>{displayTemp(dailyTempLowFour)}</td>
                                                            <td>{displayWind(dailyWSFour)}</td>
                                                            <td>{precipProbFour}%</td>
                                                        </tr>
                                                        <tr onClick={passVal5}>
                                                            <td>5</td>
                                                            <td><Button variant='link'>{dailydateFive}</Button></td>
                                                            <td><img src={imageSrcFive} alt="" height={50} width={50} />{dailyWCFive}</td>
                                                            <td>{displayTemp(dailyTempHighFive)}</td>
                                                            <td>{displayTemp(dailyTempLowFive)}</td>
                                                            <td>{displayWind(dailyWSFive)}</td>
                                                            <td>{precipProbFive}%</td>
                                                        </tr>
                                                        <tr onClick={passVal6}>
                                                            <td>6</td>
                                                            <td><Button variant='link'>{dailydateSix}</Button></td>
                                                            <td><img src={imageSrcSix} alt="" height={50} width={50} />{dailyWCSix}</td>
                                                            <td>{displayTemp(dailyTempHighSix)}</td>
                                                            <td>{displayTemp(dailyTempLowSix)}</td>
                                                            <td>{displayWind(dailyWSSix)}</td>
                                                            <td>{precipProbSix}%</td>
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
                                                celsius={isCelsius}
                                            />
                                        </Tab>
                                        <Tab eventKey="Meteogram" title="Meteogram">
                                            <Chart2 resp2={result} />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </motion.div> :
                            <Rightpage
                                handleclick2={handleClick2}
                                Row1Data={Row1Data} Row2Data={Row2Data} Row3Data={Row3Data}
                                Row4Data={Row4Data} Row5Data={Row5Data} Row6Data={Row6Data}
                                RowNo={chooseRow} ll={props.val} city={props.city} region={props.region}
                                isCelsius={isCelsius}
                                moonPhaseLabels={moonPhaseLabels}
                                precipTypeLabels={precipTypeLabels}
                            />

                    : <Favorites handleFavClick={props.handleFavClick} favValsFromBE={props.favValsFromBE} favArray={props.favArray} NoOfFavs={props.NoOfFavs} />
                }
            </div>
        </AnimatePresence>
    );
}

export default ResultLayout;
