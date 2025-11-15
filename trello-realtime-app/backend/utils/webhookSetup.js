const trelloService = require('../services/trelloService');

async function setupWebhook(boardId, callbackURL) {
  try {
    const webhook = await trelloService.createWebhook(callbackURL, boardId);
    console.log('✅ Webhook created successfully:', webhook.id);
    return webhook;
  } catch (error) {
    console.error('❌ Failed to create webhook:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { setupWebhook };