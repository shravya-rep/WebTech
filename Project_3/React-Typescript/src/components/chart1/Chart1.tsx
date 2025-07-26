
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

export interface graphVals{
    dataValsArray1:number[];
    dataValsArray2:number[];
    dataValsArray3:number[];
    dataValsArray4:number[];
    dataValsArray5:number[];
    dataValsArray6:number[];

}


const Chart1 = (props:graphVals) => {
    var ranges:number[][]= [
        props.dataValsArray1,
        props.dataValsArray2,
        props.dataValsArray3,
        props.dataValsArray4,
        props.dataValsArray5,
        props.dataValsArray6
      ];
      console.log(ranges);
    const options = {
        title: {
            text: 'Temperature Ranges (Min, Max)'
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: null
            }
        },
        time: {
            useUTC: false
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '°F',
            xDateFormat: '%A, %b %e'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '',
            data: ranges,
            type: 'arearange',
            linewidth: 5,
            lineColor:'#FFA500',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#FFA500'],
                    [1, '#72bcd4']
                ]
            }
        }]
      };
    
      return (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      );
    };
    
export default Chart1