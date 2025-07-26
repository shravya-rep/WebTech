
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsData from 'highcharts/modules/datagrouping';
import Windbarb from 'highcharts/modules/windbarb';
import PatternFill from 'highcharts/modules/pattern-fill';
import Exporting from 'highcharts/modules/exporting';
import Accessibility from 'highcharts/modules/accessibility';

HighchartsMore(Highcharts);
HighchartsData(Highcharts);
Windbarb(Highcharts);
PatternFill(Highcharts);
Exporting(Highcharts);
Accessibility(Highcharts);




export interface meteodata{
    resp2:any
}




const Chart2 = (props:meteodata) => {
    console.log(props.resp2);

    var numOfVals:number=props.resp2.data.timelines[1].intervals.length;
            var timeArrayhourly:number[]=[];
            for (var counter:number=0;counter<numOfVals;counter++) {
                var t:Date = new Date(props.resp2.data.timelines[1].intervals[counter].startTime);
                timeArrayhourly[counter] = t.getTime();
            }
    
            var tempArray:number[]=[];
                for (var counter=0;counter<numOfVals;counter++) {
                    var valueNeeded:number=props.resp2.data.timelines[1].intervals[counter].values.temperature;
                    tempArray[counter]=valueNeeded;
                }
    
            var humidityArray:number[]=[];
                for (var counter=0;counter<numOfVals;counter++) {
                    var valueNeeded:number=props.resp2.data.timelines[1].intervals[counter].values.humidity;
                    humidityArray[counter]=valueNeeded;
                }
            var airpArray:number[]=[];
                for (var counter=0;counter<numOfVals;counter++) {
                    var valueNeeded:number=props.resp2.data.timelines[1].intervals[counter].values.pressureSeaLevel;
                    airpArray[counter]=valueNeeded;
                }
            var winspeedArray:number[]=[];
            var winddirArray:number[]=[];
                for (var counter=0;counter<numOfVals;counter++) {
                    var valueNeeded1:number=props.resp2.data.timelines[1].intervals[counter].values.windSpeed;
                    winspeedArray[counter]=valueNeeded1;
                    var valueNeeded2:number=props.resp2.data.timelines[1].intervals[counter].values.windDirection;
                    winddirArray[counter]=valueNeeded2;
                }
            var temperatures=[];
            var humidity=[];
            var pressures=[];
            var winds=[];
            for (var counter=0;counter<numOfVals;counter++) {
                temperatures.push({x:timeArrayhourly[counter],y:tempArray[counter]});
                humidity.push({x:timeArrayhourly[counter],y:humidityArray[counter]});
                pressures.push({x:timeArrayhourly[counter],y:airpArray[counter]});
                       winds.push({
                            x: timeArrayhourly[counter],
                            value: winspeedArray[counter],
                            direction: winddirArray[counter]
                        })
                    }
    const options={
        chart: {
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 310,
            alignTicks: false,
            scrollablePlotArea: {
                minWidth: 720
            }
        },
        time: {
            useUTC: false
        },
        defs: {
            patterns: [{
                id: 'precipitation-error',
                path: {
                    d: [
                        'M', 3.3, 0, 'L', -6.7, 10,
                        'M', 6.7, 0, 'L', -3.3, 10,
                        'M', 10, 0, 'L', 0, 10,
                        'M', 13.3, 0, 'L', 3.3, 10,
                        'M', 16.7, 0, 'L', 6.7, 10
                    ].join(' '),
                    stroke: '#68CFE8',
                    strokeWidth: 1
                }
            }]
        },
        title: {
            text: 'Hourly Weather (For Next 5 days)',
            align: 'center',
            style: {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat:
                '<small>{point.x:%A, %b %e, %H:%M} - ' +
                '{point.point.to:%H:%M}</small><br>' +
                '<b>{point.point.symbolName}</b><br>'

        },
        xAxis: [{ // Bottom X axis
            type: 'datetime',
            tickInterval: 2 * 36e5, // two hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)',
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            showLastLabel: true,
            labels: {
                format: '{value:%H}'
            },
            crosshair: true
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: ' +
                    'bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: 8
            },
            opposite: true,
            tickLength: 20,
            gridLineWidth: 1
        }],
        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            maxPadding: 0.3,
            minRange: 8,
            tickInterval: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)'

        },
        { // precipitation axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0,
            minRange: 10,
            min: 0

        },
        { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'hPa',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '10px',
                    color: '#FFA500'
                },
                textAlign: 'left',
                x: 3
            },
            labels: {
                style: {
                    fontSize: '8px',
                    color:'#FFA500'
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        }],
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointPlacement: 'between'
            }
        },
        series: [{
            name: 'Temperature',
            data: temperatures,
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                    ' ' +
                    '{series.name}: <b>{point.y}°F</b><br/>'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8'
        },  {
            name: 'Humidity',
            data: humidity,
            type: 'column',
            color: '#68CFE8',
            yAxis: 1,
            groupPadding: 0,
            pointPadding: 0,
            grouping: false,
            dataLabels: {
                enabled: true,
                filter: {
                    operator: '>',
                    property: 'y',
                    value: 0
                },
                style: {
                    fontSize: '8px',
                    color: '#666'
                }
            },
            tooltip: {
                valueSuffix: '%'
            }
        }, {
            name: 'Air pressure',
            color: '#FFA500',
            data: pressures,
            marker: {
                enabled: false
            },
            shadow: false,
            tooltip: {
                valueSuffix: ' hPa'
            },
            dashStyle: 'shortdot',
            yAxis: 2
        }, {
            name: 'Wind',
            type: 'windbarb',
            id: 'windbarbs',
            color: '#FF3333',
            lineWidth: 1.2,
            data: winds,
            dataGrouping: {
                units: [
                    ['hour', [2]]
                ]},
            vectorLength: 10,
            yOffset: -15,
            tooltip: {
                valueSuffix: ' m/s'
            }
        }]

    }
    
        
    return (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      );
}

export default Chart2