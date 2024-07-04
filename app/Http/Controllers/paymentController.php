<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class paymentController extends Controller
{


    public function initializePayment()
    {
      $url= "https://api.paystack.co/transaction/initialize";
    }
}
