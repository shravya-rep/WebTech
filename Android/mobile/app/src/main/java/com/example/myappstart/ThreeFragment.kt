package com.example.myappstart

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView

class ThreeFragment : Fragment() {


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view =inflater.inflate(R.layout.fragment_three, container, false)
        val mainActivity=activity as MainActivity2
        if(mainActivity!=null) {
            val webview2:WebView=view.findViewById(R.id.chart2)
            webview2.settings.builtInZoomControls=false
            webview2.settings.javaScriptEnabled=true
            webview2.loadUrl("file:///android_asset/gauge.html")


        }

        return view
    }


}