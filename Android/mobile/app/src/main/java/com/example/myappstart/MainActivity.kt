package com.example.myappstart

import android.content.Context
import android.content.Intent
import android.media.Image
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.View
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ListView
import android.widget.ProgressBar
import android.widget.SearchView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.round
import android.content.ClipboardManager




class MainActivity : AppCompatActivity() {


    val IPINFOURL= "https://ipinfo.io/?token=7aafc6aef32e53"
    val WCMap = mapOf(
        1000 to "Clear,Sunny",
        1100 to "Mostly Clear",
        1101 to "Partly Cloudy",
        1001 to "Cloudy",
        2000 to "Fog",
        2100 to "Light Fog",
        8000 to "Thunderstorm",
        5001 to "Flurries",
        5100 to "Light Snow",
        5000 to "Snow",
        5101 to "Heavy Snow",
        7102 to "Light Ice Pellets",
        7000 to "Ice Pellets",
        7101 to "Heavy Ice Pellets",
        4000 to "Drizzle",
        6000 to "Freezing Drizzle",
        6200 to "Light Freezing Rain",
        6001 to "Freezing Rain",
        6201 to "Heavy Freezing Rain",
        4200 to "Light Rain",
        4001 to "Rain",
        4201 to "Heavy Rain"

    )


    val CityList= arrayListOf<String>()

    val BASE_URL = "https://weather-app-production-a0f0.up.railway.app"
    var currentLoc = "35.059,-118.2426"
    var currentCity = "Los Angeles"
    var currentRegion = "California"
    var currentFavId = ""
    var fav1Id = ""; var fav1Loc = ""; var fav1City = ""; var fav1Region = ""
    var fav2Id = ""; var fav2Loc = ""; var fav2City = ""; var fav2Region = ""
    var ipInfoLoc = "35.059,-118.2426"
    var ipInfoCity = "Los Angeles"
    var ipInfoRegion = "California"



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setTheme(R.style.Theme_MyappStart)
        setContentView(R.layout.activity_main)


        //clearing clipboard
        val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.clearPrimaryClip()
        //trial
        val progressBar:ProgressBar = findViewById(R.id.progressBar)
        progressBar.visibility = View.VISIBLE
        val pl:CardView=findViewById(R.id.placer)
        pl.visibility=View.INVISIBLE
        val FirstCard:CardView=findViewById(R.id.cardView)
        FirstCard.visibility=View.INVISIBLE
        val SecondCard:CardView=findViewById(R.id.cardView2)
        SecondCard.visibility=View.INVISIBLE
        val thirdView:LinearLayout=findViewById(R.id.linearLayout)
        thirdView.visibility=View.INVISIBLE



        var cityAfterPage=""
        val rd= intent.getParcelableExtra<Values>("datafromtwo")
        if(rd!=null)
        {
            if(rd.city=="Las Vegas")
            {
                println("Las Vegas city")
                cityAfterPage="Las Vegas"
            }
            if(rd.city=="Bonner Springs")
            {
                cityAfterPage="Bonner Springs"
            }
            else{
                println("Others")
            }

        }



                val reqQue:RequestQueue= Volley.newRequestQueue(this)
                val request= JsonObjectRequest(Request.Method.GET,IPINFOURL,null,{result->
                var location=result.getString("loc")
                var city=result.getString("city")
                var region=result.getString("region")
                ipInfoLoc = location
                ipInfoCity = city
                ipInfoRegion = region

                    callbackend(location, city, region)






            },{err -> Log.d("Volley Fail",err.message.toString())

            })
            loadFavorites()
        reqQue.add(request)









        //val today=DailyValuesList[0]
        //val t: TextView= findViewById<TextView>(R.id.textView5)
        //println(today.temperature)
        //val number= round(today.temperature)
        //t.text = number.toString()


























    }

    fun callbackend(location: String, city: String, region: String) {
        currentLoc = location
        currentCity = city
        currentRegion = region

        val DailyValuesList= arrayListOf<Values>()
        println(location)
        println(city)
        println(region)
        val latLong:List<String> =location.split(",")

        val tomIO:String="$BASE_URL/processdata"
        val urlpart1:String ="?lat="
        val urlpart2:String = latLong[0]
        val urlpart3:String ="&long="
        val urlpart4:String=latLong[1]
        val finalURL:String=tomIO+urlpart1+urlpart2+urlpart3+urlpart4

        //remove this
        /*
        val templatlong=urlpart2+","+urlpart4
        val t1:String="https://api.tomorrow.io/v4/timelines?location="
        val t2:String=templatlong
        val t3:String="&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timezone=America/Los_Angeles&timesteps=1d,1h&apikey=aUpQI55zX3dUiCNDqXQY9RBwzyn9tZGF"
        val finalURL:String=t1+t2+t3
        */


        println(finalURL)
        val reqQue2:RequestQueue= Volley.newRequestQueue(this)
        val request2= JsonObjectRequest(Request.Method.GET,finalURL,null,{result2->
            Log.d("Tommorrow.io Output",result2.toString())

            val data=result2.getJSONObject("data")
            val jsonArray=data.getJSONArray("timelines")

            val jsonObjDay = jsonArray.getJSONObject(0)
            val jsArrayDay=jsonObjDay.getJSONArray("intervals")

            println(jsArrayDay)
            for (i in 0 until jsArrayDay.length()) {
                val jsonObj = jsArrayDay.getJSONObject(i)
                //val date=jsonObj.getJSONObject("startTime")
                val date=jsonObj.getString("startTime")
                val valuesJSON=jsonObj.getJSONObject("values")
                //val uv=valuesJSON.getInt("uvIndex")
                val values=Values(
                    date.toString(),
                    valuesJSON.getDouble("cloudCover"),
                    valuesJSON.getDouble("humidity"),
                    valuesJSON.getInt("precipitationProbability"),
                    valuesJSON.getDouble("pressureSeaLevel"),
                    valuesJSON.getDouble("temperature"),
                    valuesJSON.getDouble("temperatureMax"),
                    valuesJSON.getDouble("temperatureMin"),
                    valuesJSON.getDouble("visibility"),
                    valuesJSON.getInt("weatherCode"),
                    valuesJSON.getDouble("windSpeed"),
                    valuesJSON.optInt("uvIndex", 0),
                    city,
                    region

                    )
                DailyValuesList.add(values)



                // println(jsonObj)
            }

            //progressbar


            val progressBar:ProgressBar = findViewById(R.id.progressBar)
            val FirstCard:CardView=findViewById(R.id.cardView)
            val SecondCard:CardView=findViewById(R.id.cardView2)
            val thirdView:LinearLayout=findViewById(R.id.linearLayout)
            val pl:CardView=findViewById(R.id.placer)


            CoroutineScope(Dispatchers.Main).launch{
                delay(3000)
                progressBar.visibility = View.INVISIBLE
                FirstCard.visibility=View.VISIBLE
                SecondCard.visibility=View.VISIBLE
                thirdView.visibility=View.VISIBLE
                pl.visibility=View.VISIBLE

            }
            //progress bar

            println(round(DailyValuesList[0].temperature))

            val t: TextView= findViewById<TextView>(R.id.textView5)
            val number=round(DailyValuesList[0].temperature)
            val number2:Int=number.toInt()
            t.text = number2.toString()+"°F"


            val WC=DailyValuesList[0].weatherCode
            val Img:ImageView=findViewById(R.id.WeatherImg)
            if(WC==1000){
                Img.setImageResource(R.drawable.clear_day)
            }
            if(WC==1100){
                Img.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC==1101){
                Img.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC==1102){
                Img.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC==1001){
                Img.setImageResource(R.drawable.cloudy)
            }
            if(WC==2000){
                Img.setImageResource(R.drawable.fog)
            }
            if(WC==2100){
                Img.setImageResource(R.drawable.fog_light)
            }
            if(WC==8000){
                Img.setImageResource(R.drawable.tstorm)
            }
            if(WC==5001){
                Img.setImageResource(R.drawable.flurries)
            }
            if(WC==5100){
                Img.setImageResource(R.drawable.snow_light)
            }
            if(WC==5000){
                Img.setImageResource(R.drawable.snow)
            }
            if(WC==5101){
                Img.setImageResource(R.drawable.snow_heavy)
            }
            if(WC==7102){
                Img.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC==7000){
                Img.setImageResource(R.drawable.ice_pellets)
            }
            if(WC==7101){
                Img.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC==4000){
                Img.setImageResource(R.drawable.drizzle)
            }
            if(WC==6000){
                Img.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC==6200){
                Img.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC==6001){
                Img.setImageResource(R.drawable.freezing_rain)
            }
            if(WC==6201){
                Img.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC==4200){
                Img.setImageResource(R.drawable.rain_light)
            }
            if(WC==4001){
                Img.setImageResource(R.drawable.rain)
            }
            if(WC==4201){
                Img.setImageResource(R.drawable.rain_heavy)
            }

            val t2: TextView= findViewById<TextView>(R.id.textView6)
            val code=DailyValuesList[0].weatherCode
            println(code)
            println(WCMap[code])
            t2.text=WCMap[code]

            val t3: TextView= findViewById<TextView>(R.id.textView7)
            t3.text=city+", "+region

            val t4: TextView= findViewById<TextView>(R.id.textView12)
            val num4=DailyValuesList[0].humidity
            t4.text = String.format("%.2f", num4)+"%"

            val t5: TextView= findViewById<TextView>(R.id.textView13)
            val num5=DailyValuesList[0].windSpeed
            t5.text = String.format("%.2f", num5)+"mph"

            val t6: TextView= findViewById<TextView>(R.id.textView14)
            val num6=DailyValuesList[0].visibility
            t6.text = String.format("%.2f", num6)+"mi"

            val t7: TextView= findViewById<TextView>(R.id.textView15)
            val num7=DailyValuesList[0].pressureSeaLevel
            t7.text = String.format("%.2f", num7)+"inHg"

            val dateString=DailyValuesList[0].startTime
            val d:List<String> =dateString.split("T")

            val t8: TextView= findViewById<TextView>(R.id.textView17)
            t8.text=d[0]

            val WC1=DailyValuesList[0].weatherCode
            val Img1:ImageView=findViewById(R.id.imageView6)
            if(WC1==1000){
                Img1.setImageResource(R.drawable.clear_day)
            }
            if(WC1==1100){
                Img1.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC1==1101){
                Img1.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC1==1102){
                Img1.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC1==1001){
                Img1.setImageResource(R.drawable.cloudy)
            }
            if(WC1==2000){
                Img1.setImageResource(R.drawable.fog)
            }
            if(WC1==2100){
                Img1.setImageResource(R.drawable.fog_light)
            }
            if(WC1==8000){
                Img1.setImageResource(R.drawable.tstorm)
            }
            if(WC1==5001){
                Img1.setImageResource(R.drawable.flurries)
            }
            if(WC1==5100){
                Img1.setImageResource(R.drawable.snow_light)
            }
            if(WC1==5000){
                Img1.setImageResource(R.drawable.snow)
            }
            if(WC1==5101){
                Img1.setImageResource(R.drawable.snow_heavy)
            }
            if(WC1==7102){
                Img1.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC1==7000){
                Img1.setImageResource(R.drawable.ice_pellets)
            }
            if(WC1==7101){
                Img1.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC1==4000){
                Img1.setImageResource(R.drawable.drizzle)
            }
            if(WC1==6000){
                Img1.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC1==6200){
                Img1.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC1==6001){
                Img1.setImageResource(R.drawable.freezing_rain)
            }
            if(WC1==6201){
                Img1.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC1==4200){
                Img1.setImageResource(R.drawable.rain_light)
            }
            if(WC1==4001){
                Img1.setImageResource(R.drawable.rain)
            }
            if(WC1==4201){
                Img1.setImageResource(R.drawable.rain_heavy)
            }





            val t9: TextView= findViewById<TextView>(R.id.textView18)
            val num9=DailyValuesList[0].temperatureMin
            t9.text= round(num9).toInt().toString()

            val t10: TextView= findViewById<TextView>(R.id.textView19)
            val num10=DailyValuesList[0].temperatureMax
            t10.text= round(num10).toInt().toString()

            //second row
            val dateString1=DailyValuesList[1].startTime
            val d1:List<String> =dateString1.split("T")

            val t18: TextView= findViewById<TextView>(R.id.textView20)
            t18.text=d1[0]

            val WC2=DailyValuesList[1].weatherCode
            val Img2:ImageView=findViewById(R.id.imageView7)
            if(WC2==1000){
                Img2.setImageResource(R.drawable.clear_day)
            }
            if(WC2==1100){
                Img2.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC2==1101){
                Img2.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC2==1102){
                Img2.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC2==1001){
                Img2.setImageResource(R.drawable.cloudy)
            }
            if(WC2==2000){
                Img2.setImageResource(R.drawable.fog)
            }
            if(WC2==2100){
                Img2.setImageResource(R.drawable.fog_light)
            }
            if(WC2==8000){
                Img2.setImageResource(R.drawable.tstorm)
            }
            if(WC2==5001){
                Img2.setImageResource(R.drawable.flurries)
            }
            if(WC2==5100){
                Img2.setImageResource(R.drawable.snow_light)
            }
            if(WC2==5000){
                Img2.setImageResource(R.drawable.snow)
            }
            if(WC2==5101){
                Img2.setImageResource(R.drawable.snow_heavy)
            }
            if(WC2==7102){
                Img2.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC2==7000){
                Img2.setImageResource(R.drawable.ice_pellets)
            }
            if(WC2==7101){
                Img2.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC2==4000){
                Img2.setImageResource(R.drawable.drizzle)
            }
            if(WC2==6000){
                Img2.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC2==6200){
                Img2.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC2==6001){
                Img2.setImageResource(R.drawable.freezing_rain)
            }
            if(WC2==6201){
                Img2.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC2==4200){
                Img2.setImageResource(R.drawable.rain_light)
            }
            if(WC2==4001){
                Img2.setImageResource(R.drawable.rain)
            }
            if(WC2==4201){
                Img2.setImageResource(R.drawable.rain_heavy)
            }

            val t19: TextView= findViewById<TextView>(R.id.textView21)
            val num19=DailyValuesList[1].temperatureMin
            t19.text= round(num19).toInt().toString()

            val t110: TextView= findViewById<TextView>(R.id.textView22)
            val num110=DailyValuesList[1].temperatureMax
            t110.text= round(num110).toInt().toString()

            //third row
            val dateString2=DailyValuesList[2].startTime
            val d2:List<String> =dateString2.split("T")

            val t28: TextView= findViewById<TextView>(R.id.textView23)
            t28.text=d2[0]

            val WC3=DailyValuesList[2].weatherCode
            val Img3:ImageView=findViewById(R.id.imageView8)
            if(WC3==1000){
                Img3.setImageResource(R.drawable.clear_day)
            }
            if(WC3==1100){
                Img3.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC3==1101){
                Img3.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC3==1102){
                Img3.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC3==1001){
                Img3.setImageResource(R.drawable.cloudy)
            }
            if(WC3==2000){
                Img3.setImageResource(R.drawable.fog)
            }
            if(WC3==2100){
                Img3.setImageResource(R.drawable.fog_light)
            }
            if(WC3==8000){
                Img3.setImageResource(R.drawable.tstorm)
            }
            if(WC3==5001){
                Img3.setImageResource(R.drawable.flurries)
            }
            if(WC3==5100){
                Img3.setImageResource(R.drawable.snow_light)
            }
            if(WC3==5000){
                Img3.setImageResource(R.drawable.snow)
            }
            if(WC3==5101){
                Img3.setImageResource(R.drawable.snow_heavy)
            }
            if(WC3==7102){
                Img3.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC3==7000){
                Img3.setImageResource(R.drawable.ice_pellets)
            }
            if(WC3==7101){
                Img3.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC3==4000){
                Img3.setImageResource(R.drawable.drizzle)
            }
            if(WC3==6000){
                Img3.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC3==6200){
                Img3.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC3==6001){
                Img3.setImageResource(R.drawable.freezing_rain)
            }
            if(WC3==6201){
                Img3.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC3==4200){
                Img3.setImageResource(R.drawable.rain_light)
            }
            if(WC3==4001){
                Img3.setImageResource(R.drawable.rain)
            }
            if(WC3==4201){
                Img3.setImageResource(R.drawable.rain_heavy)
            }

            val t29: TextView= findViewById<TextView>(R.id.textView24)
            val num29=DailyValuesList[2].temperatureMin
            t29.text= round(num29).toInt().toString()

            val t120: TextView= findViewById<TextView>(R.id.textView25)
            val num120=DailyValuesList[2].temperatureMax
            t120.text= round(num120).toInt().toString()

            //fourth row
            val dateString3=DailyValuesList[3].startTime
            val d3:List<String> =dateString3.split("T")

            val t38: TextView= findViewById<TextView>(R.id.textView26)
            t38.text=d3[0]

            val WC4=DailyValuesList[3].weatherCode
            val Img4:ImageView=findViewById(R.id.imageView9)
            if(WC4==1000){
                Img4.setImageResource(R.drawable.clear_day)
            }
            if(WC4==1100){
                Img4.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC4==1101){
                Img4.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC4==1102){
                Img4.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC4==1001){
                Img4.setImageResource(R.drawable.cloudy)
            }
            if(WC4==2000){
                Img4.setImageResource(R.drawable.fog)
            }
            if(WC4==2100){
                Img4.setImageResource(R.drawable.fog_light)
            }
            if(WC4==8000){
                Img4.setImageResource(R.drawable.tstorm)
            }
            if(WC4==5001){
                Img4.setImageResource(R.drawable.flurries)
            }
            if(WC4==5100){
                Img4.setImageResource(R.drawable.snow_light)
            }
            if(WC4==5000){
                Img4.setImageResource(R.drawable.snow)
            }
            if(WC4==5101){
                Img4.setImageResource(R.drawable.snow_heavy)
            }
            if(WC4==7102){
                Img4.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC4==7000){
                Img4.setImageResource(R.drawable.ice_pellets)
            }
            if(WC4==7101){
                Img4.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC4==4000){
                Img4.setImageResource(R.drawable.drizzle)
            }
            if(WC4==6000){
                Img4.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC4==6200){
                Img4.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC4==6001){
                Img4.setImageResource(R.drawable.freezing_rain)
            }
            if(WC4==6201){
                Img4.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC4==4200){
                Img4.setImageResource(R.drawable.rain_light)
            }
            if(WC4==4001){
                Img4.setImageResource(R.drawable.rain)
            }
            if(WC4==4201){
                Img4.setImageResource(R.drawable.rain_heavy)
            }

            val t39: TextView= findViewById<TextView>(R.id.textView27)
            val num39=DailyValuesList[3].temperatureMin
            t39.text= round(num39).toInt().toString()

            val t130: TextView= findViewById<TextView>(R.id.textView28)
            val num130=DailyValuesList[3].temperatureMax
            t130.text= round(num130).toInt().toString()

            //fifth row
            val dateString4=DailyValuesList[4].startTime
            val d4:List<String> =dateString4.split("T")

            val t48: TextView= findViewById<TextView>(R.id.textView29)
            t48.text=d4[0]

            val WC5=DailyValuesList[4].weatherCode
            val Img5:ImageView=findViewById(R.id.imageView10)
            if(WC5==1000){
                Img5.setImageResource(R.drawable.clear_day)
            }
            if(WC5==1100){
                Img5.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC5==1101){
                Img5.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC5==1102){
                Img5.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC5==1001){
                Img5.setImageResource(R.drawable.cloudy)
            }
            if(WC5==2000){
                Img5.setImageResource(R.drawable.fog)
            }
            if(WC5==2100){
                Img5.setImageResource(R.drawable.fog_light)
            }
            if(WC5==8000){
                Img5.setImageResource(R.drawable.tstorm)
            }
            if(WC5==5001){
                Img5.setImageResource(R.drawable.flurries)
            }
            if(WC5==5100){
                Img5.setImageResource(R.drawable.snow_light)
            }
            if(WC5==5000){
                Img5.setImageResource(R.drawable.snow)
            }
            if(WC5==5101){
                Img5.setImageResource(R.drawable.snow_heavy)
            }
            if(WC5==7102){
                Img5.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC5==7000){
                Img5.setImageResource(R.drawable.ice_pellets)
            }
            if(WC5==7101){
                Img5.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC5==4000){
                Img5.setImageResource(R.drawable.drizzle)
            }
            if(WC5==6000){
                Img5.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC5==6200){
                Img5.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC5==6001){
                Img5.setImageResource(R.drawable.freezing_rain)
            }
            if(WC5==6201){
                Img5.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC5==4200){
                Img5.setImageResource(R.drawable.rain_light)
            }
            if(WC5==4001){
                Img5.setImageResource(R.drawable.rain)
            }
            if(WC5==4201){
                Img5.setImageResource(R.drawable.rain_heavy)
            }

            val t49: TextView= findViewById<TextView>(R.id.textView30)
            val num49=DailyValuesList[4].temperatureMin
            t49.text= round(num49).toInt().toString()

            val t140: TextView= findViewById<TextView>(R.id.textView31)
            val num140=DailyValuesList[4].temperatureMax
            t140.text= round(num140).toInt().toString()

            //sixth row
            val dateString5=DailyValuesList[5].startTime
            val d5:List<String> =dateString5.split("T")

            val t58: TextView= findViewById<TextView>(R.id.textView32)
            t58.text=d5[0]

            val WC6=DailyValuesList[3].weatherCode
            val Img6:ImageView=findViewById(R.id.imageView11)
            if(WC6==1000){
                Img6.setImageResource(R.drawable.clear_day)
            }
            if(WC6==1100){
                Img6.setImageResource(R.drawable.mostly_clear_day)
            }
            if(WC6==1101){
                Img6.setImageResource(R.drawable.partly_cloudy_day)
            }
            if(WC6==1102){
                Img6.setImageResource(R.drawable.mostly_cloudy)
            }
            if(WC6==1001){
                Img6.setImageResource(R.drawable.cloudy)
            }
            if(WC6==2000){
                Img6.setImageResource(R.drawable.fog)
            }
            if(WC6==2100){
                Img6.setImageResource(R.drawable.fog_light)
            }
            if(WC6==8000){
                Img6.setImageResource(R.drawable.tstorm)
            }
            if(WC6==5001){
                Img6.setImageResource(R.drawable.flurries)
            }
            if(WC6==5100){
                Img6.setImageResource(R.drawable.snow_light)
            }
            if(WC6==5000){
                Img6.setImageResource(R.drawable.snow)
            }
            if(WC6==5101){
                Img6.setImageResource(R.drawable.snow_heavy)
            }
            if(WC6==7102){
                Img6.setImageResource(R.drawable.ice_pellets_light)
            }
            if(WC6==7000){
                Img6.setImageResource(R.drawable.ice_pellets)
            }
            if(WC6==7101){
                Img6.setImageResource(R.drawable.ice_pellets_heavy)
            }
            if(WC6==4000){
                Img6.setImageResource(R.drawable.drizzle)
            }
            if(WC6==6000){
                Img6.setImageResource(R.drawable.freezing_drizzle)
            }
            if(WC6==6200){
                Img6.setImageResource(R.drawable.freezing_rain_light)
            }
            if(WC6==6001){
                Img6.setImageResource(R.drawable.freezing_rain)
            }
            if(WC6==6201){
                Img6.setImageResource(R.drawable.freezing_rain_heavy)
            }
            if(WC6==4200){
                Img6.setImageResource(R.drawable.rain_light)
            }
            if(WC6==4001){
                Img6.setImageResource(R.drawable.rain)
            }
            if(WC6==4201){
                Img6.setImageResource(R.drawable.rain_heavy)
            }

            val t59: TextView= findViewById<TextView>(R.id.textView33)
            val num59=DailyValuesList[5].temperatureMin
            t59.text= round(num59).toInt().toString()

            val t150: TextView= findViewById<TextView>(R.id.textView34)
            val num150=DailyValuesList[5].temperatureMax
            t150.text= round(num150).toInt().toString()

            //click the card

            val card1:CardView=findViewById(R.id.cardView)
            card1.setOnClickListener{
                val intent=Intent(this,MainActivity2::class.java)
                intent.putExtra("data",DailyValuesList[0])
                intent.putParcelableArrayListExtra("weeklyData", DailyValuesList)
                startActivity(intent)
            }

            // Set FAB icon based on whether current city is already a favorite
            currentFavId = when {
                city == fav1City && fav1Id.isNotEmpty() -> fav1Id
                city == fav2City && fav2Id.isNotEmpty() -> fav2Id
                else -> ""
            }
            val fab: ImageView= findViewById(R.id.floatingActionButton)
            fab.setImageResource(if (currentFavId.isNotEmpty()) R.drawable.rem_fav else R.drawable.add_fav)

            fab.setOnClickListener{
                if (currentFavId.isNotEmpty()) {
                    deleteFromFavorites(currentFavId, city)
                } else {
                    addToFavorites(currentLoc, city, region)
                }










            }

            val dotDef:ImageView=findViewById(R.id.dot1)
            dotDef.setOnClickListener{
                val defLoc=ipInfoLoc
                val defCity=ipInfoCity
                val defRegion=ipInfoRegion

                //trial
                val progressBar:ProgressBar = findViewById(R.id.progressBar)
                progressBar.visibility = View.VISIBLE
                val pl:CardView=findViewById(R.id.placer)
                pl.visibility=View.INVISIBLE
                val FirstCard:CardView=findViewById(R.id.cardView)
                FirstCard.visibility=View.INVISIBLE
                val SecondCard:CardView=findViewById(R.id.cardView2)
                SecondCard.visibility=View.INVISIBLE
                val thirdView:LinearLayout=findViewById(R.id.linearLayout)
                thirdView.visibility=View.INVISIBLE

                val fab: ImageView= findViewById(R.id.floatingActionButton)
                fab.visibility=View.INVISIBLE

                callbackend(defLoc,defCity,defRegion)
            }

            val dotfav1:ImageView=findViewById(R.id.dot2)
            dotfav1.setOnClickListener{
                if (fav1Loc.isNotEmpty()) {
                    val progressBar:ProgressBar = findViewById(R.id.progressBar)
                    progressBar.visibility = View.VISIBLE
                    val pl:CardView=findViewById(R.id.placer)
                    pl.visibility=View.INVISIBLE
                    val FirstCard:CardView=findViewById(R.id.cardView)
                    FirstCard.visibility=View.INVISIBLE
                    val SecondCard:CardView=findViewById(R.id.cardView2)
                    SecondCard.visibility=View.INVISIBLE
                    val thirdView:LinearLayout=findViewById(R.id.linearLayout)
                    thirdView.visibility=View.INVISIBLE
                    fab.visibility=View.VISIBLE
                    callbackend(fav1Loc, fav1City, fav1Region)
                }
            }


            val dotfav2:ImageView=findViewById(R.id.dot3)
            dotfav2.setOnClickListener{
                if (fav2Loc.isNotEmpty()) {
                    val progressBar:ProgressBar = findViewById(R.id.progressBar)
                    progressBar.visibility = View.VISIBLE
                    val pl:CardView=findViewById(R.id.placer)
                    pl.visibility=View.INVISIBLE
                    val FirstCard:CardView=findViewById(R.id.cardView)
                    FirstCard.visibility=View.INVISIBLE
                    val SecondCard:CardView=findViewById(R.id.cardView2)
                    SecondCard.visibility=View.INVISIBLE
                    val thirdView:LinearLayout=findViewById(R.id.linearLayout)
                    thirdView.visibility=View.INVISIBLE
                    fab.visibility=View.VISIBLE
                    callbackend(fav2Loc, fav2City, fav2Region)
                }
            }



            val searchIcon:ImageView=findViewById(R.id.imageView12)
            val searchBar: SearchView =findViewById(R.id.searchBar)
            val WApp:TextView=findViewById(R.id.WeatherApp)
            val goBack:ImageView=findViewById(R.id.goback)
            val dotView:ImageView=findViewById(R.id.dot1)
            val dot2View:ImageView=findViewById(R.id.dot2)
            val dot3View:ImageView=findViewById(R.id.dot3)
            val dotCont:CardView=findViewById(R.id.placer)
            val searchRes:TextView=findViewById((R.id.searchresult))



            searchIcon.setOnClickListener {
                searchBar.visibility = View.VISIBLE
                goBack.visibility=View.VISIBLE
                searchIcon.visibility=View.INVISIBLE
                WApp.visibility=View.INVISIBLE
                dotCont.visibility=View.INVISIBLE

                //newCity=1
            }

            goBack.setOnClickListener{
                WApp.visibility=View.VISIBLE
                searchIcon.visibility=View.VISIBLE
                goBack.visibility=View.INVISIBLE
                searchBar.visibility = View.INVISIBLE
                dotView.visibility=View.VISIBLE
                if (fav1Id.isNotEmpty()) dot2View.visibility=View.VISIBLE
                if (fav2Id.isNotEmpty()) dot3View.visibility=View.VISIBLE
                searchRes.visibility=View.INVISIBLE
                fab.visibility=View.INVISIBLE
                val defLoc=ipInfoLoc
                val defCity=ipInfoCity
                val defRegion=ipInfoRegion
                //trial
                val progressBar:ProgressBar = findViewById(R.id.progressBar)
                progressBar.visibility = View.VISIBLE
                val pl:CardView=findViewById(R.id.placer)
                pl.visibility=View.INVISIBLE
                val FirstCard:CardView=findViewById(R.id.cardView)
                FirstCard.visibility=View.INVISIBLE
                val SecondCard:CardView=findViewById(R.id.cardView2)
                SecondCard.visibility=View.INVISIBLE
                val thirdView:LinearLayout=findViewById(R.id.linearLayout)
                thirdView.visibility=View.INVISIBLE

                callbackend(defLoc,defCity,defRegion)
                //newCity=0
            }

            searchBar.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
                override fun onQueryTextSubmit(query: String): Boolean {
                    println(query)
                    var finalCity:String=query.replace(" ","+")
                    var APIKEY = "AIzaSyDIOoQ8sIRAi7O9s-xQtWpowOWf9x-zkJQ"
                    var initialURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+finalCity+"&key="+APIKEY
                    println(initialURL)
                    searchRes.visibility=View.VISIBLE
                    fab.setImageResource(R.drawable.add_fav)
                    fab.visibility=View.VISIBLE
                    dotCont.visibility=View.VISIBLE
                    getLatLong(this@MainActivity,initialURL)

                    return true
                }

                override fun onQueryTextChange(newText: String): Boolean {
                    println(newText)
                    trial(this@MainActivity,newText,CityList)
                    println("Inside the function")
                    println(CityList)
                    return true
                }


            })

















            /*
                val next=jsArrayDay.getJSONObject(0)
                println(next)
                val next2=next.getJSONObject("values")
                println(next2)

             */



            val jsonObjWeek= jsonArray.getJSONObject(1)
            val jsArrayWeek=jsonObjWeek.getJSONArray("intervals")
            println(jsArrayWeek)




        },{err->Log.d("Volley Fail",err.message.toString())

        })
        reqQue2.add(request2)






    }

    fun trial(context: Context, cityVal:String,cityList:ArrayList<String>){

        println("Inside the trial function")
        val autoURL="$BASE_URL/autocomplete?cityval="+cityVal
        val requestQueue: RequestQueue = Volley.newRequestQueue(context)
        val request= JsonObjectRequest(Request.Method.GET,autoURL,null,{result->
            Log.d("Tommorrow.io Output",result.toString())
            val jsArrayPred =result.getJSONArray("predictions")
            //println(jsArrayPred)
            for (j in 0 until jsArrayPred.length()) {
                val jOb = jsArrayPred.getJSONObject(j)
                val allcity=jOb.getJSONArray("terms")
                val cityA=allcity.getJSONObject(0)
                val city=cityA.getString("value")
                //println(city)
                cityList.add(city)

            }
            //println(cityList)




        },{err -> Log.d("Volley Fail",err.message.toString())

        })
        requestQueue.add(request)


    }

    fun loadFavorites() {
        val url = "$BASE_URL/loaddata"
        val reqQue = Volley.newRequestQueue(this)
        val req = com.android.volley.toolbox.JsonArrayRequest(Request.Method.GET, url, null, { result ->
            if (result.length() > 0) {
                val f1 = result.getJSONObject(0)
                fav1Id = f1.getString("_id")
                fav1Loc = f1.optString("latlongval", "")
                fav1City = f1.optString("city", "")
                fav1Region = f1.optString("state", "")
                val dot2: ImageView = findViewById(R.id.dot2)
                dot2.visibility = View.VISIBLE
            }
            if (result.length() > 1) {
                val f2 = result.getJSONObject(1)
                fav2Id = f2.getString("_id")
                fav2Loc = f2.optString("latlongval", "")
                fav2City = f2.optString("city", "")
                fav2Region = f2.optString("state", "")
                val dot3: ImageView = findViewById(R.id.dot3)
                dot3.visibility = View.VISIBLE
            }
        }, { err -> Log.d("Volley", err.message.toString()) })
        reqQue.add(req)
    }

    fun addToFavorites(loc: String, city: String, region: String) {
        val url = "$BASE_URL/storedata?latlongval=$loc&city=$city&state=$region"
        val reqQue = Volley.newRequestQueue(this)
        val req = com.android.volley.toolbox.JsonObjectRequest(Request.Method.GET, url, null, { result ->
            val id = result.getString("_id")
            currentFavId = id
            Toast.makeText(this, "$city was added to favorites", Toast.LENGTH_LONG).show()
            val fab: ImageView = findViewById(R.id.floatingActionButton)
            fab.setImageResource(R.drawable.rem_fav)
            if (fav1Id.isEmpty()) {
                fav1Id = id; fav1Loc = loc; fav1City = city; fav1Region = region
                val dot2: ImageView = findViewById(R.id.dot2)
                dot2.visibility = View.VISIBLE
            } else if (fav2Id.isEmpty()) {
                fav2Id = id; fav2Loc = loc; fav2City = city; fav2Region = region
                val dot3: ImageView = findViewById(R.id.dot3)
                dot3.visibility = View.VISIBLE
            }
        }, { err -> Log.d("Volley", err.message.toString()) })
        reqQue.add(req)
    }

    fun deleteFromFavorites(favId: String, city: String) {
        val url = "$BASE_URL/deletedata?_id=$favId"
        val reqQue = Volley.newRequestQueue(this)
        val req = com.android.volley.toolbox.JsonObjectRequest(Request.Method.GET, url, null, { result ->
            Toast.makeText(this, "$city was removed from favorites", Toast.LENGTH_LONG).show()
            val fab: ImageView = findViewById(R.id.floatingActionButton)
            fab.setImageResource(R.drawable.add_fav)
            if (fav1Id == favId) {
                fav1Id = fav2Id; fav1Loc = fav2Loc; fav1City = fav2City; fav1Region = fav2Region
                fav2Id = ""; fav2Loc = ""; fav2City = ""; fav2Region = ""
                val dot3: ImageView = findViewById(R.id.dot3)
                dot3.visibility = View.INVISIBLE
                if (fav1Id.isEmpty()) {
                    val dot2: ImageView = findViewById(R.id.dot2)
                    dot2.visibility = View.INVISIBLE
                }
            } else if (fav2Id == favId) {
                fav2Id = ""; fav2Loc = ""; fav2City = ""; fav2Region = ""
                val dot3: ImageView = findViewById(R.id.dot3)
                dot3.visibility = View.INVISIBLE
            }
            currentFavId = ""
        }, { err -> Log.d("Volley", err.message.toString()) })
        reqQue.add(req)
    }

    fun getLatLong(context: Context,URL:String){
        println("Inside getLatLong")
        val requestQueue: RequestQueue = Volley.newRequestQueue(context)
        val request= JsonObjectRequest(Request.Method.GET,URL,null, { result ->
            Log.d("Tommorrow.io Output", result.toString())
            val res=result.getJSONArray("results")
            val res2=res.getJSONObject(0)
            val addr=res2.getString("formatted_address")
            val addr2:List<String> =addr.split(",")
            val res3=res2.getJSONObject("geometry")
            val res4=res3.getJSONObject("location")
            val lat=res4.getString("lat")
            val lng=res4.getString("lng")
            println(lat)
            println(lng)
            val finalLoc=lat+","+lng

            //trial
            val progressBar:ProgressBar = findViewById(R.id.progressBar)
            progressBar.visibility = View.VISIBLE
            val pl:CardView=findViewById(R.id.placer)
            pl.visibility=View.INVISIBLE
            val FirstCard:CardView=findViewById(R.id.cardView)
            FirstCard.visibility=View.INVISIBLE
            val SecondCard:CardView=findViewById(R.id.cardView2)
            SecondCard.visibility=View.INVISIBLE
            val thirdView:LinearLayout=findViewById(R.id.linearLayout)
            thirdView.visibility=View.INVISIBLE
            callbackend(finalLoc,addr2[0],addr2[1])


            //println(res4)
        }, { err ->
            Log.d("Volley Fail", err.message.toString())
        })
        requestQueue.add(request)


    }

}


