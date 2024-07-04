<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {

        return view('setting.index');
    }

    
    public function settingPageContact()
    {

        return view('setting.pages.contact');
    }

    public function settingPageSubscribe()
    {

        return view('setting.pages.subscribe');
    }

    public function settingPageFooter()
    {

        return view('setting.pages.footer');
    }

    
}
