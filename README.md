# API Bot

A Slack bot built with Node.js and the Slack Bolt framework.

## Features

- `/mhy-ping` – Check bot latency.
- `/mhy-city` – Get information about cities.
- `/mhy-fact` – Get random facts.
- `/mhy-inspire` – Receive an inspirational quote.
- `/mhy-humour` – Get a humorous response.
- `/mhy-dadjoke` – Get a random dad joke.

## Tech Stack

- Node.js
- Slack Bolt
- Axios
- API Ninjas

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `tokens.env` file with:

```env
SLACK_BOT_TOKEN=your_bot_token
SLACK_APP_TOKEN=your_app_token
API_NINJAS_KEY=your_api_key
```

4. Start the bot:

```bash
node index.js
```

## Repository

https://github.com/MuhammadHamzaYasir/api-bot
