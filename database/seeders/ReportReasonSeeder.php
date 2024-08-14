<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\ReportReason;

class ReportReasonSeeder extends Seeder
{
    public function run()
    {
        $reasons = [
            'Sexual content',
            'Scam',
            'Harmful',
            'Abuse',
            'Others'
        ];

        foreach ($reasons as $reason) {
            ReportReason::create(['reason' => $reason]);
        }
    }
}

