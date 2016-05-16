# messenger-bot

[![Build Status](https://travis-ci.org/waitingcheung/messenger-bot.svg?branch=master)](https://travis-ci.org/waitingcheung/messenger-bot)
[![codecov](https://codecov.io/gh/waitingcheung/messenger-bot/branch/master/graph/badge.svg)](https://codecov.io/gh/waitingcheung/messenger-bot)

This is my facebook bot for asking coding questions. You may ask questions such as
- How do I format timestamps in Java?
- How can I find the largest number of in an array in Swift?
- What is the difference between null and undefined in JavaScript?
- ...

### Demo

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/OTlqFy6h5UY/0.jpg)](https://youtu.be/OTlqFy6h5UY)

### Requirements
You need several API keys to use this bot.
- FB_PAGE_ID: 
  1. Create a Facebook page from https://developers.facebook.com/apps/
  2. Go to your page.
  3. Your page id is under **Settings** -> **Page Info** -> **Facebook Page ID**.
- FB_PAGE_TOKEN:
  1. Visit your page from https://developers.facebook.com
  2. Find your token under **Meseenger** -> **Page Access Token**.
- FB_VERIFY_TOKEN: Any string of your choice.
- WIT_TOKEN: Create a wit app from https://wit.ai/home and find your **Server Access Token** from **Settings**.

## Testing

### Environment Variables
```sh
export FB_PAGE_ID=YOUR_FACEBOOK_PAGE_ID
export FB_PAGE_TOKEN=YOUR_FACEBOOK_PAGE_TOKEN
export FB_VERIFY_TOKEN=YOUR_FACEBOOK_VERIFY_TOKEN
export WIT_TOKEN=YOUR_WIT_TOKEN
```

### Unit Testing
```sh
npm test
```

### Bot Testing
```sh
node src/bot
```
