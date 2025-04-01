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

export const agentInviteTemplate = ({
    businessName,
    agentName,
    email,
    password,
    loginUrl
  }: {
    businessName: string;
    agentName?: string;
    email: string;
    password: string;
    loginUrl: string;
  }) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to ${businessName} Team</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .content {
            padding: 20px 0;
          }
          .credentials {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome to ${businessName}!</h2>
          </div>
          <div class="content">
            <p>Hello ${agentName || 'there'},</p>
            <p>You have been invited to join the ${businessName} team as an agent. Below are your login credentials:</p>
            
            <div class="credentials">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
            
            <p>Please use these credentials to log in to your account. For security reasons, we recommend changing your password after your first login.</p>
            
            <a href="${loginUrl}" class="button">Login to Your Account</a>
            
            <p>If you have any questions or need assistance, please contact your administrator.</p>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };