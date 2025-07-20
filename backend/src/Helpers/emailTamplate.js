export const emailData = (name, otp) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .otp {
            font-size: 36px;
            font-weight: bold;
            color: #ffffff;
            background-color: #0B0A0F;
            padding: 10px 25px;
            border-radius: 8px;
            display: inline-block;
        }
        .otp-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        .footer p {
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #3498db;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body class="bg-light">

<section class="container px-6 py-8 mx-auto bg-white rounded shadow-lg">
    <main class="mt-4">
        <h2 class="text-secondary">Hi ${name},</h2>
        <p class="mt-2">This is your verification code:</p>

        <div class="otp-container">
            <p class="otp">${otp}</p>
        </div>

        <p class="mt-4">This code will only be valid for the next 5 minutes.</p>
      
        <p class="mt-8">Thanks, <br>
             PlainB team
        </p>
        
    </main>
    
    <footer class="mt-8 footer">
        <p>
            This email was sent to <a href="mailto:monirhdigital@gmail.com">support@gmail.com</a>. 
    
        </p>
        <p class="mt-3">© ${new Date().getFullYear()} PlainB. All Rights Reserved.</p>
    </footer>
</section>

</body>
</html>
    `;
}
