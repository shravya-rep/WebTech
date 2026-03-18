package com.example.myappstart

import android.content.res.Resources.NotFoundException
import android.os.Bundle
import android.content.Intent
import android.net.Uri
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.viewpager.widget.ViewPager
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator

class MainActivity2 : AppCompatActivity() {
    lateinit var receivedData:Values
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main2)



        var tabLayout: TabLayout =findViewById(R.id.tabLayout)
        var viewPager: ViewPager2 =findViewById(R.id.viewPager)
        viewPager.adapter=PagerAdapter(this)
        TabLayoutMediator(tabLayout,viewPager){tab,index->
            tab.text=when(index){
                0->{"Today"}
                1->{"Weekly"}
                2->{"Weather Data"}
                else->{throw NotFoundException("Position error")}
            }
        }.attach()

        val rd= intent.getParcelableExtra<Values>("data")
        if(rd!=null)
        {
            receivedData=rd
        }
        println("Inside Activity two")
        println(receivedData)

        val region: TextView =findViewById(R.id.textView2)
        region.text=receivedData.city+", "+receivedData.region

        val tweet:ImageView=findViewById(R.id.tweet)
        tweet.setOnClickListener{
            //val tweetMessage = "Check out this amazing app!"
            val city:String=receivedData.city
            val region2:String=receivedData.region
            val temp:String=(receivedData.temperature).toString()+"°F!"

            val tweetUrl = "https://twitter.com/intent/tweet?text=Check out "+city+", "+region2+", "+"USA's weather! It is "+temp+"&hashtags="+"CSCI571WeatherSearch"
            val tweetIntent = Intent(Intent.ACTION_VIEW, Uri.parse(tweetUrl))
            startActivity(tweetIntent)
        }

        val back: ImageView=findViewById(R.id.imageView16)
        back.setOnClickListener{
            val intent=Intent(this,MainActivity::class.java)
            intent.putExtra("datafromtwo",receivedData)
            startActivity(intent)

        }




    }
}