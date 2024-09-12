{{-- <!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
</head>
<body>
    <p>Click the link below to reset your password:</p>
    <a href="{{ $url }}">Reset Password</a>
</body>
</html> --}}


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        /* Tailwind CSS styles inline for email compatibility */
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .card {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            background-color: #1d4ed8; /* Blue button color */
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #1e40af; /* Darker blue on hover */
        }
        .text-center {
            text-align: center;
        }
        .mt-4 {
            margin-top: 1rem;
        }
    </style>
</head>
<body style="background-color: #f3f4f6; font-family: Arial, sans-serif; padding: 20px;">
    <div class="container">
        <div class="card">
            <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Reset Your Password</h1>
            <p style="font-size: 16px; color: #555555;">Hello,</p>
            <p style="font-size: 16px; color: #555555;">Click the button below to reset your password. If you did not request a password reset, please ignore this email.</p>
            <a href="{{ $url }}" class="button mt-4">Reset Password</a>
            <p style="font-size: 14px; color: #888888; margin-top: 20px;">If you have any questions, feel free to contact our support team at <a href="mailto:chibuike@innoblog.com.ng" style="color: #1d4ed8;">chibuike@innoblog.com.ng</a>.</p>
        </div>
    </div>
</body>
</html>
