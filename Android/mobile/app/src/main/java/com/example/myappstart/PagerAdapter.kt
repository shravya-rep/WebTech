package com.example.myappstart

import android.content.res.Resources.NotFoundException
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter

class PagerAdapter(fragmentActivity: FragmentActivity): FragmentStateAdapter(fragmentActivity){
    override fun getItemCount()= 3

    override fun createFragment(position: Int): Fragment {
        return when(position){
            0->{OneFragment()}
            1->{TwoFragment()}
            2->{ThreeFragment()}
            else-> {throw NotFoundException("Position not found")}
        }
    }
}