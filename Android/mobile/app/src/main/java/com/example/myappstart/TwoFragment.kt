package com.example.myappstart

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone


class TwoFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_two, container, false)
        val mainActivity = activity as? MainActivity2 ?: return view

        val webView: WebView = view.findViewById(R.id.chart1)
        webView.settings.builtInZoomControls = false
        webView.settings.javaScriptEnabled = true
        webView.settings.loadWithOverviewMode = true
        webView.settings.useWideViewPort = true

        val weeklyData = mainActivity.weeklyData
        val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.US)
        sdf.timeZone = TimeZone.getTimeZone("UTC")

        val sb = StringBuilder("[")
        for (i in 0 until minOf(6, weeklyData.size)) {
            val v = weeklyData[i]
            val timestamp = try {
                val dateStr = v.startTime.split("T")[0]
                sdf.parse(dateStr)?.time ?: 0L
            } catch (e: Exception) { 0L }
            if (i > 0) sb.append(",")
            sb.append("[${timestamp},${v.temperatureMin.toInt()},${v.temperatureMax.toInt()}]")
        }
        sb.append("]")

        val html = """<!DOCTYPE html><html><head>
<script src="https://code.highcharts.com/es5/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
</head><body>
<div id="container" style="width:100%;height:500px;margin:0 auto"></div>
<script>
var ranges = $sb;
Highcharts.chart('container', {
  title: { text: 'Temperature variation by day' },
  xAxis: { type: 'datetime' },
  yAxis: { title: { text: 'Values' } },
  tooltip: { crosshairs: true, shared: true, valueSuffix: '\u00b0F', xDateFormat: '%A, %b %e' },
  series: [{
    data: ranges,
    type: 'arearange',
    linewidth: 5,
    lineColor: '#FFA500',
    fillColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [[0, '#FFA500'], [1, '#72bcd4']]
    }
  }]
});
</script></body></html>"""

        webView.loadDataWithBaseURL("https://code.highcharts.com", html, "text/html", "UTF-8", null)
        return view
    }
}
