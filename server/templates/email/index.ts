export const chatTranscriptTemplate = (data: {
  businessName: string;
  customerEmail: string;
  messages: Array<{
    sender: string;
    content: string;
    timestamp: Date;
  }>;
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px; background: #f8f9fa; }
        .message { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .customer { background: #e3f2fd; }
        .business { background: #f5f5f5; }
        .timestamp { color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>${data.businessName} - Chat Transcript</h2>
            <p>Conversation with ${data.customerEmail}</p>
        </div>
        ${data.messages.map(msg => `
            <div class="message ${msg.sender === 'customer' ? 'customer' : 'business'}">
                <strong>${msg.sender === 'customer' ? 'Customer' : 'Agent'}</strong>
                <p>${msg.content}</p>
                <div class="timestamp">${new Date(msg.timestamp).toLocaleString()}</div>
            </div>
        `).join('')}
    </div>
</body>
</html>
`;

export const welcomeEmailTemplate = (data: {
  businessName: string;
  apiKey: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px; background: #f8f9fa; }
        .content { padding: 20px; }
        .api-key { background: #e3f2fd; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Welcome to ${data.businessName}!</h2>
        </div>
        <div class="content">
            <p>Thank you for choosing our live chat solution. Here's your API key:</p>
            <div class="api-key">
                <code>${data.apiKey}</code>
            </div>
            <p>Keep this API key safe and use it to integrate the chat widget into your website.</p>
        </div>
    </div>
</body>
</html>
`;

export const passwordResetTemplate = (data: {
  businessName: string;
  resetLink: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px; background: #f8f9fa; }
        .content { padding: 20px; }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>${data.businessName} - Password Reset</h2>
        </div>
        <div class="content">
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <p style="text-align: center;">
                <a href="${data.resetLink}" class="button">Reset Password</a>
            </p>
            <p>If you didn't request this, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`;