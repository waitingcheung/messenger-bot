# messenger-bot

[![Build Status](https://travis-ci.org/waitingcheung/messenger-bot.svg?branch=master)](https://travis-ci.org/waitingcheung/messenger-bot)
[![codecov](https://codecov.io/gh/waitingcheung/messenger-bot/branch/master/graph/badge.svg)](https://codecov.io/gh/waitingcheung/messenger-bot)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/waitingcheung/messenger-bot/blob/master/LICENSE)

This is my facebook bot for asking coding questions. You may ask questions such as
- How do I format timestamps in Java?
- How can I find the largest number of in an array in Swift?
- What is the difference between null and undefined in JavaScript?

and it will send you code snippets and/or explanations such as
```sh
What about:
    let numbers = [1, 6, 3, 9, 4, 6]
    numbers.minElement()
    numbers.maxElement()
```

Click [here] to visit my bot.

## Demo

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/OTlqFy6h5UY/0.jpg)](https://youtu.be/OTlqFy6h5UY)

## Update
- 2016 May 20: Facebook has approved my page for the permission of sending messages to users. You may message my bot for coding questions from [here].

## Configuration

### API Keys

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

### Wit Story

You may create a Wit story like the following.

![](https://cloud.githubusercontent.com/assets/2617118/15283614/77c72254-1b7e-11e6-9c40-a168cf43635d.png)

## Deployment to Heroku

### Facebook Webhooks

1. Visit your page from https://developers.facebook.com
2. Go to **Webhooks** from the side menu.
3. Set your **Callback URL** to the following and your **Verify Token** to your FB_VERIFY_TOKEN

```sh
https://your-app-id.herokuapp.com/fb
```

### Heroku Environment Variables
You need to configure your environment variables FB_PAGE_ID, FB_PAGE_TOKEN, FB_VERIFY_TOKEN, WIT_TOKEN under **Settings** of your Heroku app.

![](https://cloud.githubusercontent.com/assets/2617118/15424592/1ec55d02-1eb6-11e6-834b-cbf1d4796549.png)


### Deployment
```sh
heroku create
git push heroku master
```

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

[here]: https://www.facebook.com/Captain-Neko-802565366543110/
