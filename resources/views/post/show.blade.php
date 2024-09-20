<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="{{ $title }}" />
    <meta property="og:description" content="{{ $description }}" />
    <meta property="og:image" content="{{ url($image) }}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ url()->current() }}" />
    
    <!-- Standard Meta Tags -->
    <title>{{ $title }}</title>
</head>
<body>
    <!-- Root for React app -->
    <div id="root"></div>
    <p>{{ $title }}</p>
    <p>{{ $description }}</p>
    <img src="{{ $image }}" alt="{{ $title }}">

    
    <!-- React JS bundle -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
