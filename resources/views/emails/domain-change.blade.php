@component('mail::message')
# My Project Website Domain Has Changed!

Dear **{{ $name }}**,

I want to inform you that my project website domain has changed.

### 🔴 Old Domain:
[{{ $oldDomain }}]({{ $oldDomain }})

### 🟢 New Domain:
[{{ $newDomain }}]({{ $newDomain }})

you can login as usual at the new domain.

If you have any questions, feel free to contact  [innoblog@chibuikeinnocent.tech](mailto:innoblog@chibuikeinnocent.tech).

@component('mail::button', ['url' => $newDomain, 'color' => 'primary'])
Visit New Website
@endcomponent

Thanks,<br>
**{{ config('app.name') }}**
@endcomponent
