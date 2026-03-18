
export interface CurrentConditionsProps {
    city: string;
    region: string;
    data: any;
    weather: { [key: number]: string[] };
    isCelsius: boolean;
}

const CurrentConditions = (props: CurrentConditionsProps) => {
    const { data, weather, isCelsius } = props;
    const v = data.values;
    const wc = v.weatherCode;
    const label = weather[wc] ? weather[wc][0] : 'Unknown';
    const icon  = weather[wc] ? weather[wc][1] : 'Images/clear_day.svg';

    const toC   = (f: number) => Math.round((f - 32) * 5 / 9 * 10) / 10;
    const dispT = (f: number) => isCelsius ? `${toC(f)}°C` : `${Math.round(f)}°F`;
    const dispW = (mph: number) => isCelsius ? `${Math.round(mph * 1.60934)} km/h` : `${Math.round(mph)} mph`;
    const dispV = (mi: number)  => isCelsius ? `${Math.round(mi * 1.60934)} km`   : `${Math.round(mi)} mi`;

    const time = new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
            color: 'white',
            borderRadius: 12,
            padding: '1rem 1.25rem',
            margin: '0.75rem 0'
        }}>
            <div className='d-flex justify-content-between align-items-start'>
                <div>
                    <div className='fs-5 fw-semibold'>{props.city}, {props.region}</div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>As of {time}</div>
                    <div style={{ fontSize: 64, lineHeight: 1, fontWeight: 300, marginTop: 8 }}>
                        {dispT(v.temperature)}
                    </div>
                    <div style={{ marginTop: 4 }}>{label}</div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>Feels like {dispT(v.temperatureApparent)}</div>
                </div>
                <img src={icon} height={90} width={90}
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))', marginTop: 8 }} />
            </div>
            <hr style={{ borderColor: 'rgba(255,255,255,0.25)', margin: '0.75rem 0' }} />
            <div className='d-flex gap-4 flex-wrap' style={{ fontSize: 13 }}>
                <div><div style={{ opacity: 0.7 }}>Humidity</div>{v.humidity}%</div>
                <div><div style={{ opacity: 0.7 }}>Wind</div>{dispW(v.windSpeed)}</div>
                <div><div style={{ opacity: 0.7 }}>UV Index</div>{v.uvIndex}</div>
                <div><div style={{ opacity: 0.7 }}>Rain chance</div>{v.precipitationProbability}%</div>
                <div><div style={{ opacity: 0.7 }}>Cloud cover</div>{v.cloudCover}%</div>
                <div><div style={{ opacity: 0.7 }}>Visibility</div>{dispV(v.visibility)}</div>
            </div>
        </div>
    );
};

export default CurrentConditions;
