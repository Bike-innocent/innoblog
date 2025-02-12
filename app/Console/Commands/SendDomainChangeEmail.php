<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Mail\DomainChangeNotification;
use Illuminate\Support\Facades\Mail;

class SendDomainChangeEmail extends Command
{
    protected $signature = 'notify:domain-change';
    protected $description = 'Send an email notification to users about the domain change';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $users = User::all(); // Get all users

        foreach ($users as $user) {
            Mail::to($user->email)->queue(new DomainChangeNotification($user));
        }

        $this->info('Domain change emails have been sent successfully!');
    }
}