@extends('layouts.dash')

@section('content')
<h1>Edit Profile</h1>


    <div class=" m-2">
      
            @include('profile.partials.update-profile-information-form')
   
      
            @include('profile.partials.update-password-form')
   
      
            @include('profile.partials.delete-user-form')
   

    </div>
@endsection
