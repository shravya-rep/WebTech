package com.example.myappstart

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView

class ThreeFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_three, container, false)
        val mainActivity = activity as? MainActivity2 ?: return view

        val cc = mainActivity.receivedData.cloudCover.toInt()
        val ppt = mainActivity.receivedData.precipitationProbability
        val hum = mainActivity.receivedData.humidity.toInt()

        val webView: WebView = view.findViewById(R.id.chart2)
        webView.settings.builtInZoomControls = false
        webView.settings.javaScriptEnabled = true

        val html = """<!DOCTYPE html><html><head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
</head><body>
<div id="chartcontainer" style="width:100%;height:110%"></div>
<script>
function renderIcons() {
  if (!this.series[0].icon) {
    this.series[0].icon = this.renderer.path(['M',-8,0,'L',8,0,'M',0,-8,'L',8,0,0,8])
      .attr({stroke:'#303030','stroke-linecap':'round','stroke-linejoin':'round','stroke-width':2,zIndex:10})
      .add(this.series[2].group);
  }
  this.series[0].icon.translate(this.chartWidth/2-10,this.plotHeight/2-this.series[0].points[0].shapeArgs.innerR-(this.series[0].points[0].shapeArgs.r-this.series[0].points[0].shapeArgs.innerR)/2);
  if (!this.series[1].icon) {
    this.series[1].icon = this.renderer.path(['M',-8,0,'L',8,0,'M',0,-8,'L',8,0,0,8,'M',8,-8,'L',16,0,8,8])
      .attr({stroke:'#ffffff','stroke-linecap':'round','stroke-linejoin':'round','stroke-width':2,zIndex:10})
      .add(this.series[2].group);
  }
  this.series[1].icon.translate(this.chartWidth/2-10,this.plotHeight/2-this.series[1].points[0].shapeArgs.innerR-(this.series[1].points[0].shapeArgs.r-this.series[1].points[0].shapeArgs.innerR)/2);
  if (!this.series[2].icon) {
    this.series[2].icon = this.renderer.path(['M',0,8,'L',0,-8,'M',-8,0,'L',0,-8,8,0])
      .attr({stroke:'#303030','stroke-linecap':'round','stroke-linejoin':'round','stroke-width':2,zIndex:10})
      .add(this.series[2].group);
  }
  this.series[2].icon.translate(this.chartWidth/2-10,this.plotHeight/2-this.series[2].points[0].shapeArgs.innerR-(this.series[2].points[0].shapeArgs.r-this.series[2].points[0].shapeArgs.innerR)/2);
}
Highcharts.chart('chartcontainer', {
  chart: { type: 'solidgauge', height: '110%', events: { render: renderIcons } },
  title: { text: 'Stat Summary', style: { fontSize: '24px' } },
  tooltip: {
    borderWidth: 0, backgroundColor: 'none', shadow: false, style: { fontSize: '16px' },
    valueSuffix: '%',
    pointFormat: '{series.name}<br><span style="font-size:2em;color:{point.color};font-weight:bold">{point.y}</span>',
    positioner: function(labelWidth) { return { x: (this.chart.chartWidth-labelWidth)/2, y: (this.chart.plotHeight/2)+15 }; }
  },
  pane: {
    startAngle: 0, endAngle: 360,
    background: [
      { outerRadius: '112%', innerRadius: '88%', backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(), borderWidth: 0 },
      { outerRadius: '87%', innerRadius: '63%', backgroundColor: Highcharts.color('#57b9ff').setOpacity(0.3).get(), borderWidth: 0 },
      { outerRadius: '62%', innerRadius: '38%', backgroundColor: Highcharts.color('#c73100').setOpacity(0.3).get(), borderWidth: 0 }
    ]
  },
  yAxis: { min: 0, max: 100, lineWidth: 0, tickPositions: [] },
  plotOptions: { solidgauge: { dataLabels: { enabled: false }, linecap: 'round', stickyTracking: false, rounded: true } },
  series: [
    { name: 'CloudCover', data: [{ color: Highcharts.getOptions().colors[2], radius: '112%', innerRadius: '88%', y: $cc }] },
    { name: 'Precipitation', data: [{ color: '#57b9ff', radius: '87%', innerRadius: '63%', y: $ppt }] },
    { name: 'Humidity', data: [{ color: '#c73100', radius: '62%', innerRadius: '38%', y: $hum }] }
  ]
});
</script></body></html>"""

        webView.loadDataWithBaseURL("https://code.highcharts.com", html, "text/html", "UTF-8", null)
        return view
    }
}
