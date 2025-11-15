const axios = require('axios');
require('dotenv').config();

async function setupWebhook() {
  const API_KEY = process.env.TRELLO_API_KEY;
  const API_TOKEN = process.env.TRELLO_API_TOKEN;
  const WEBHOOK_URL = process.env.WEBHOOK_URL;
  
  if (!API_KEY || !API_TOKEN || !WEBHOOK_URL) {
    console.error('❌ Missing required environment variables');
    console.log('Please set TRELLO_API_KEY, TRELLO_API_TOKEN, and WEBHOOK_URL in .env file');
    process.exit(1);
  }

  const boardId = process.argv[2];
  if (!boardId) {
    console.error('❌ Board ID is required');
    console.log('Usage: node setup-webhook.js <BOARD_ID>');
    process.exit(1);
  }

  try {
    const response = await axios.post(
      `https://api.trello.com/1/webhooks?key=${API_KEY}&token=${API_TOKEN}`,
      {
        callbackURL: WEBHOOK_URL,
        idModel: boardId,
        description: 'Trello Real-time Sync Webhook'
      }
    );

    console.log('✅ Webhook created successfully!');
    console.log('Webhook ID:', response.data.id);
    console.log('Callback URL:', response.data.callbackURL);
    console.log('Board ID:', response.data.idModel);
    
  } catch (error) {
    console.error('❌ Failed to create webhook:', error.response?.data || error.message);
    process.exit(1);
  }
}

setupWebhook();