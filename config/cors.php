<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    //'allowed_origins' => ['https://innoblog.com.ng','http://localhost:5173'],
    'allowed_origins' =>['*'],
    'allowed_methods' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];