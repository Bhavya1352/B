const axios = require('axios');

class TrelloService {
  constructor() {
    this.baseURL = 'https://api.trello.com/1';
    this.apiKey = process.env.TRELLO_API_KEY;
    this.apiToken = process.env.TRELLO_API_TOKEN;
  }

  getAuthParams() {
    return `key=${this.apiKey}&token=${this.apiToken}`;
  }

  async createBoard(name, defaultLists = true) {
    console.log('API Key:', this.apiKey);
    console.log('Demo mode check:', this.apiKey === 'test123');
    
    // Demo mode - return fake board
    if (this.apiKey === 'test123') {
      console.log('Using demo mode for board creation');
      return {
        id: 'demo_board_' + Date.now(),
        name: name,
        lists: [
          { id: 'list1', name: 'To Do' },
          { id: 'list2', name: 'Doing' },
          { id: 'list3', name: 'Done' }
        ],
        cards: []
      };
    }
    console.log('Using real Trello API');
    const url = `${this.baseURL}/boards?${this.getAuthParams()}&name=${encodeURIComponent(name)}&defaultLists=${defaultLists}`;
    const response = await axios.post(url);
    return response.data;
  }

  async createCard(boardId, listId, name, desc = '') {
    // Demo mode - return fake card
    if (this.apiKey === 'test123') {
      return {
        id: 'demo_card_' + Date.now(),
        name: name,
        desc: desc,
        idList: listId,
        idBoard: boardId
      };
    }
    const url = `${this.baseURL}/cards?${this.getAuthParams()}`;
    const response = await axios.post(url, {
      idList: listId,
      name,
      desc
    });
    return response.data;
  }

  async updateCard(cardId, updates) {
    // Demo mode - return fake updated card
    if (this.apiKey === 'test123') {
      return {
        id: cardId,
        ...updates
      };
    }
    const url = `${this.baseURL}/cards/${cardId}?${this.getAuthParams()}`;
    const response = await axios.put(url, updates);
    return response.data;
  }

  async deleteCard(cardId) {
    // Demo mode - return success
    if (this.apiKey === 'test123') {
      return { id: cardId, closed: true };
    }
    const url = `${this.baseURL}/cards/${cardId}?${this.getAuthParams()}&closed=true`;
    const response = await axios.put(url);
    return response.data;
  }

  async getBoard(boardId) {
    // Demo mode - return fake board data
    if (this.apiKey === 'test123') {
      return {
        id: boardId,
        name: 'Demo Board',
        lists: [
          { id: 'list1', name: 'To Do' },
          { id: 'list2', name: 'Doing' },
          { id: 'list3', name: 'Done' }
        ],
        cards: [
          { id: 'card1', name: 'Sample Task 1', desc: 'This is a demo task', idList: 'list1' },
          { id: 'card2', name: 'Sample Task 2', desc: 'Another demo task', idList: 'list2' }
        ]
      };
    }
    const url = `${this.baseURL}/boards/${boardId}?${this.getAuthParams()}&lists=open&cards=open`;
    const response = await axios.get(url);
    return response.data;
  }

  async createWebhook(callbackURL, idModel) {
    const url = `${this.baseURL}/webhooks?${this.getAuthParams()}`;
    const response = await axios.post(url, {
      callbackURL,
      idModel,
      description: 'Trello Real-time Sync Webhook'
    });
    return response.data;
  }
}

module.exports = new TrelloService();