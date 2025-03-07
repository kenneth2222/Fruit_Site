const html = (verifyLink, firstName) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign-Up Confirmation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            padding: 20px;
            /* text-align: center; */
            position: absolute;
            width: 150px;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .header img {
            position: relative;
            width: 100%;
            height: 100%;
            margin-bottom: 20px;
            left: 190px;
            top: -20px;

            
        }
        .blue-section {
            background-color: #00a9e0;
            color: white;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            

            & a {
                margin-top: 30px;
            }
        }
        .blue-section h1 {
            font-size: 32px;
            margin: 0 0 10px;
            margin-top: 80px;
        }
        .blue-section p {
            font-size: 18px;
            margin: 10px 0;
        }
        .btn {
            background-color: #a1d700;
            color: white;
            padding: 15px 30px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            font-weight: bold;
        }
        .info-section {
            padding: 20px 20px;
            background-color: #f0f8ff;
            color: #333;
            text-align: center;
        }
        .help-section {
            padding: 40px 20px;
            text-align: center;
        }
        .help-section h2 {
            color: #0073e6;
            font-size: 28px;
        }
        .footer {
            padding: 20px;
            font-size: 14px;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/dhlfbfuem/image/upload/v1740674021/fruit-of-the-loom-logo-png_seeklogo-57935_vzt9xs.png" alt="Campaign Monitor Logo">
        </div>
        <div class="blue-section">
            <h1>Welcome ${firstName}</h1>
            <p>You're all set. Now you can choose from our wide range of healthy freshly picked fruits.</p>
            <a href="${verifyLink}" class="btn">VERIFY YOUR EMAIL ADDRESS</a>
        </div>
        <div class="info-section">
            <h2>Your new account</h2>
            <p><strong>Userrname:</strong> xxxxxxxxxxx.gmail.com</p>
            <p><strong>Password:</strong> xxxxxxx@xxxxxxxxxxxxxxx</p>
        </div>
        <div class="help-section">
            <h2>We're here to help!</h2>
            <p>To talk with one of our email marketing experts, call <strong>+2347061234567</strong> or email us at <a href="mailto:somtourigwe4@gmail.com">somtourigwe4@gmail.com</a></p>
            <img src="https://res.cloudinary.com/dhlfbfuem/image/upload/v1740674963/equipe-jeunes-africains-au-bureau_219728-4386_xuotg4.avif" alt="Support Team">
        </div>
        <div class="footer">
            <p>24 Road Carat 24, Festac Town, Lagos, Nigeria</p>
            <p>You're receiving this because you've signed up for a new account.</p>
            <p><a href="#">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = html;
