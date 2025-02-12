@component('mail::message')
# Reset Your Password

Hello,

Click the button below to reset your password. If you did not request a password reset, please ignore this email.

@component('mail::button', ['url' => $url, 'color' => 'primary'])
Reset Password
@endcomponent

If you have any questions, feel free to contact our support team at [innoblog@chibuikeinnocent.tech](mailto:innoblog@chibuikeinnocent.tech).

Thanks,
{{ config('app.name') }}
@endcomponent
