const html = (verifyLink, firstName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AiEngineer Podcast</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f3f4f6;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                line-height: 1.6;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                margin: 20px;
            }
            .header {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 2rem;
                animation: fadeIn 1s ease-out;
            }
            @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(-10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .content {
                padding: 20px;
                color: #4a4a4a;
                font-size: 1rem;
            }
            .content p {
                margin: 10px 0;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 14px 28px;
                font-size: 1.1rem;
                color: white;
                background-color: #2575fc;
                border-radius: 8px;
                text-decoration: none;
                transition: all 0.3s ease;
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            }
            .button:hover {
                background-color: #6a11cb;
                transform: translateY(-3px);
                box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
            }
            .footer {
                background: #f1f1f1;
                padding: 15px;
                text-align: center;
                font-size: 0.9rem;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome Aboard, ${firstName}!</h1>
            </div>
            <div class="content">
                <p>Thank you for signing up for the <strong>AiEngineer Podcast</strong>. We're thrilled to have you on board!</p>
                <p>To get started, please verify your account by clicking the button below:</p>
                <div class="button-container">
                    <a href="${verifyLink}" class="button">Verify My Account</a>
                </div>
                <p>If you did not sign up, please ignore this email.</p>
                <p>Cheers,<br>The AiEngineer Team</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} AiEngineer. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = html;
