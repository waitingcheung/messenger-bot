'use strict';

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference
const request = require('request');
const Config = require('./const');

const fbReq = request.defaults({
    uri: 'https://graph.facebook.com/me/messages',
    method: 'POST',
    json: true,
    qs: {
        access_token: Config.FB_PAGE_TOKEN
    },
    headers: {
        'Content-Type': 'application/json'
    },
});

const fbMessage = (recipientId, msg, cb) => {
    const opts = {
        form: {
            recipient: {
                id: recipientId,
            },
            message: {
                text: typeof msg === 'string' ? msg : '',
                "attachment": typeof msg === 'object' ? msg : undefined,
            },
        },
    };
    fbReq(opts, (err, resp, data) => {
        if (cb) {
            cb(err || data.error && data.error.message, data);
        }
    });
};

// See the Webhook reference
// https://developers.facebook.com/docs/messenger-platform/webhook-reference
const getFirstMessagingEntry = (body) => {
    const val = body.object == 'page' &&
        body.entry &&
        Array.isArray(body.entry) &&
        body.entry.length > 0 &&
        body.entry[0] &&
        body.entry[0].id == Config.FB_PAGE_ID &&
        body.entry[0].messaging &&
        Array.isArray(body.entry[0].messaging) &&
        body.entry[0].messaging.length > 0 &&
        body.entry[0].messaging[0];
    return val || null;
};

module.exports = {
    fbReq: fbReq,
    fbMessage: fbMessage,
    getFirstMessagingEntry: getFirstMessagingEntry
}