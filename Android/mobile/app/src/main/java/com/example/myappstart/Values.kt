package com.example.myappstart
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Values(
        val startTime:String,
        val cloudCover: Double,
        val humidity: Double,
        val precipitationProbability: Int,
        val pressureSeaLevel: Double,
        val temperature: Double,
        val temperatureMax: Double,
        val temperatureMin: Double,
        val visibility: Double,
        val weatherCode: Int,
        val windSpeed: Double,
        val uvIndex:Int,
        val city:String,
        val region:String
):Parcelable