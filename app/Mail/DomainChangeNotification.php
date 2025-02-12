<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DomainChangeNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('My Project Website Domain Has Changed!')
                    ->markdown('emails.domain-change')
                    ->with([
                        'name' => $this->user->name,
                        'oldDomain' => 'https://innoblog.com.ng',
                        'newDomain' => 'https://innoblog.chibuikeinnocent.tech',
                    ]);
    }
}