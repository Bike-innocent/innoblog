<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SubscriptionController extends Controller
{
    /**
     * Show the subscription form.
     *
     * @return \Illuminate\View\View
     */
    public function show()
    {
        return view('subscribe');
    }

    /**
     * Process subscription payment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function processSubscription(Request $request)
    {
        $request->validate([
            'plan' => 'required|string',
            'email' => 'required|email',
            'name' => 'required|string',
        ]);

        $plans = [
            'weekly' => 50000, // Amount in kobo
            'monthly' => 200000,
            'yearly' => 2000000,
        ];

        $amount = $plans[$request->plan];
        $email = $request->email;
        $name = $request->name;

        $url = "https://api.paystack.co/transaction/initialize";

        $fields = [
            'email' => $email,
            'amount' => $amount,
            'metadata' => [
                'custom_fields' => [
                    ['display_name' => 'Full Name', 'variable_name' => 'name', 'value' => $name],
                ],
            ],
        ];

        $headers = [
            'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
            'Cache-Control' => 'no-cache',
        ];

        $response = Http::withHeaders($headers)->post($url, $fields);

        if ($response->successful()) {
            $paymentData = $response->json();
            return redirect($paymentData['data']['authorization_url']);
        } else {
            return back()->withErrors('There was an issue processing your payment. Please try again.');
        }
    }

    /**
     * Handle Paystack callback for successful payment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\View\View|\Illuminate\Http\RedirectResponse
     */
    public function handleGatewayCallback(Request $request)
    {
        $paymentDetails = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
            'Cache-Control' => 'no-cache',
        ])->get('https://api.paystack.co/transaction/verify/' . $request->reference);

        if ($paymentDetails->successful() && $paymentDetails['data']['status'] == 'success') {
            // Pass payment details to the payment view
            return view('payment', ['paymentDetails' => $paymentDetails['data']]);
        } else {
            return redirect()->route('subscribe')->withErrors('Payment verification failed. Please contact support.');
        }
    }
}
