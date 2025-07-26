package com.example.myappstart

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.lifecycle.findViewTreeViewModelStoreOwner


class OneFragment : Fragment() {
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

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        val view = inflater.inflate(R.layout.fragment_one, container, false)

        val mainActivity=activity as MainActivity2
        if(mainActivity!=null)
        {
            val variableFromActivity=mainActivity.receivedData
            println(variableFromActivity)



            val Card1: TextView= view.findViewById(R.id.textViewWS)
            val ws=variableFromActivity.windSpeed
            Card1.text= ws.toString()+"mph"

            val Card2: TextView=view.findViewById(R.id.textViewP)
            val p=variableFromActivity.pressureSeaLevel
            Card2.text=p.toString()+"inHg"

            val Card3: TextView=view.findViewById(R.id.textViewPPT)
            val ppt=variableFromActivity.precipitationProbability
            Card3.text=ppt.toString()+"%"

            val Card4: TextView=view.findViewById(R.id.textViewTemp)
            val temp=variableFromActivity.temperature
            Card4.text=temp.toString()+"°F"

            val Card5: TextView=view.findViewById(R.id.textViewWC)
            val WC=variableFromActivity.weatherCode
            Card5.text=WCMap[WC]

            val Img:ImageView=view.findViewById(R.id.imageViewWC)
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

            val Card6: TextView=view.findViewById(R.id.textViewHum)
            val hum=variableFromActivity.humidity
            Card6.text=hum.toString()+"%"

            val Card7: TextView=view.findViewById(R.id.textViewVis)
            val vis=variableFromActivity.visibility
            Card7.text=vis.toString()+"mi"

            val Card8: TextView=view.findViewById(R.id.textViewCC)
            val cc=variableFromActivity.cloudCover
            Card8.text=cc.toString()+"%"

            val Card9: TextView=view.findViewById(R.id.textViewOzone)
            val uv=3
            Card9.text=uv.toString()





        }

        return view
    }


}