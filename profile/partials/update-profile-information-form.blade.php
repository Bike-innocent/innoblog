{{-- 
<div class="m-1 m-lg-4">
    <header>
        <h4 class=" m-2 text-lg  text-gray-900">
            {{ __('Profile Information') }}
        </h4>

        <p class=" text-sm text-gray-600 m-2">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div class="mb-2 m-2">
            <label for="name" class="form-label m-1">{{ __('Name') }}</label>
            <input id="name" name="name" type="text" class="form-control  w-75 "
                value="{{ old('name', $user->name) }}" required autofocus autocomplete="name">
            @error('name')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-2 m-2">
            <label for="email" class="form-label m-1">{{ __('Email') }}</label>
            <input id="email" name="email" type="email" class="form-control w-75"
                value="{{ old('email', $user->email) }}" required autocomplete="email">
            @error('email')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail())
                <div class="mt-2">
                    <p class="text-sm text-gray-800">
                        {{ __('Your email address is unverified.') }}

                        <button form="send-verification" class="btn btn-link text-decoration-none">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-success">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div class="d-flex align-items-center gap-4 m-2">
            <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>

           
            @if (session('status') === 'profile-updated')
                <p x-data="{ show: true }" x-show="show" x-transition:enter="transition ease-out duration-300"
                    x-transition:leave="transition ease-in duration-300" x-init="setTimeout(() => show = false, 5000)"
                    class="text-sm text-gray-600 text-success">
                    {{ __('Saved.') }}
                </p>
            @endif

        </div>
    </form>
</div> --}}

<div class="m-1 m-lg-4">
    <header>
        <h4 class="m-2 text-lg text-gray-900">
            {{ __('Profile Information') }}
        </h4>
        <p class="text-sm text-gray-600 m-2">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" enctype="multipart/form-data" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div class="mb-2 m-2">
            <label for="name" class="form-label m-1">{{ __('Name') }}</label>
            <input id="name" name="name" type="text" class="form-control w-75"
                   value="{{ old('name', $user->name) }}" required autofocus autocomplete="name">
            @error('name')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-2 m-2">
            <label for="email" class="form-label m-1">{{ __('Email') }}</label>
            <input id="email" name="email" type="email" class="form-control w-75"
                   value="{{ old('email', $user->email) }}" required autocomplete="email">
            @error('email')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail())
                <div class="mt-2">
                    <p class="text-sm text-gray-800">
                        {{ __('Your email address is unverified.') }}
                        <button form="send-verification" class="btn btn-link text-decoration-none">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>
                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-success">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div class="mb-2 m-2">
            <label for="avatar" class="form-label m-1">{{ __('Avatar') }}</label>
            <input id="avatar" name="avatar" type="file" class="form-control w-75">
            @if (!$user->avatar)
                <div class="text-danger mt-2">{{ __('No avatar uploaded') }}</div>
            @else
                <div class="mt-2">
                    <img src="{{ asset('storage/' . $user->avatar) }}" alt="{{ $user->name }}" class="img-fluid  " style="width:100px; height:100px; object-fit:cover;"  >
                    <button type="button" class="btn btn-danger btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#deleteAvatarModal">{{ __('Delete Avatar') }}</button>
                </div>
            @endif
            @error('avatar')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror
        </div>

        <div class="d-flex align-items-center gap-4 m-2">
            <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
            @if (session('status') === 'profile-updated')
                <p x-data="{ show: true }" x-show="show" x-transition:enter="transition ease-out duration-300"
                   x-transition:leave="transition ease-in duration-300" x-init="setTimeout(() => show = false, 5000)"
                   class="text-sm text-gray-600 text-success">
                    {{ __('Saved.') }}
                </p>
            @endif
        </div>
    </form>
</div>
<div class="modal fade" id="deleteAvatarModal" tabindex="-1" aria-labelledby="deleteAvatarModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteAvatarModalLabel">{{ __('Delete Avatar') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {{ __('Are you sure you want to delete your avatar? This action cannot be undone.') }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ __('Cancel') }}</button>
                <form method="post" action="{{ route('profile.deleteAvatar') }}">
                    @csrf
                    @method('delete')
                    <button type="submit" class="btn btn-danger">{{ __('Delete') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>


