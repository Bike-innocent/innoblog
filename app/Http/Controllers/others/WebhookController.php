<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $event = $request->event;

        if ($event === 'charge.success') {
            // handle successful charge
            Log::info('Charge successful: ' . json_encode($request->all()));
        }

        return response()->json(['status' => 'success']);
    }
}
