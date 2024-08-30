<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
<<<<<<< HEAD
    
    'allowed_origins' => ['https://innoblog.com.ng'],
=======

    'allowed_origins' => ['https://innoblog.com.ng','http://localhost:5173'],
>>>>>>> d90b37b721fa7b948e5a1ac792d0bdaa4e04b14c
//    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
