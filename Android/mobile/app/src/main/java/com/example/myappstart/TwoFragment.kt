package com.example.myappstart

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import java.time.Instant


class TwoFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view =inflater.inflate(R.layout.fragment_two, container, false)
        val mainActivity=activity as MainActivity2
        if(mainActivity!=null) {
            val webView:WebView= view.findViewById(R.id.chart1)
            webView.settings.builtInZoomControls=false
            webView.settings.javaScriptEnabled=true
            webView.settings.loadWithOverviewMode=true
            webView.settings.useWideViewPort=true
            webView.loadUrl("file:///android_asset/chart1_HW4.html")

        }



        return view
    }


}