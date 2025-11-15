# 🚀 Quick Setup Guide

## Prerequisites Checklist

- [ ] Node.js v16+ installed
- [ ] Git installed  
- [ ] Trello account created
- [ ] ngrok installed (for webhooks)

## Step-by-Step Setup

### 1. Get Trello Credentials

1. Go to https://trello.com/app-key
2. Copy your **API Key**
3. Click "Token" link to generate **API Token**
4. Save both securely

### 2. Clone & Install

```bash
git clone <your-repo-url>
cd trello-realtime-app

# Backend setup
cd backend
npm install
cp .env.example .env

# Frontend setup  
cd ../frontend
npm install
```

### 3. Configure Environment

Edit `backend/.env`:
```env
TRELLO_API_KEY=your_api_key_here
TRELLO_API_TOKEN=your_api_token_here
PORT=3001
WEBHOOK_URL=https://your-ngrok-url.ngrok.io/webhook
```

### 4. Start ngrok

```bash
# New terminal
ngrok http 3001
# Copy the https URL and update WEBHOOK_URL in .env
```

### 5. Run Application

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend  
cd frontend
npm run dev
```

### 6. Setup Webhook (Optional)

```bash
# After creating a board, run:
cd backend
node scripts/setup-webhook.js YOUR_BOARD_ID
```

## Quick Test

1. Open http://localhost:3000
2. Create a new board
3. Add some cards
4. Open another browser window to see real-time sync

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3001
npx kill-port 3001
```

**API calls failing?**
- Check Trello credentials in .env
- Verify internet connection
- Check Trello API rate limits

**WebSocket not connecting?**
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify CORS settings

## Ready to Demo! 🎉

Your Trello real-time board is now ready for the internship evaluation.