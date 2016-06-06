'use strict';

// When not cloning the `node-wit` repo, replace the `require` like so:
const Wit = require('node-wit').Wit;
const FB = require('./facebook');
const Config = require('./const');
const assert = require('assert');

const stackoverflow = require('./stackoverflow');

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

// Our bot actions
const actions = {
    say(sessionId, context, message, cb) {
        // Our bot has something to say!
        // Let's retrieve the Facebook user whose session belongs to
        const recipientId = context._fbid_; // sessions[sessionId].fbid;
        if (recipientId) {
            // Yay, we found our recipient!
            // Let's forward our bot response to her.
            FB.fbMessage(recipientId, message, (err, data) => {
                if (err) {
                    console.log(
                        'Oops! An error occurred while forwarding the response to',
                        recipientId,
                        ':',
                        err
                    );
                }

                // Let's give the wheel back to our bot
                cb();
            });
        } else {
            console.log('Oops! Couldn\'t find user for session:', sessionId);
            // Giving the wheel back to our bot
            cb();
        }
    },
    merge(sessionId, context, entities, message, cb) {
        const text = firstEntityValue(entities, 'coding_question');
        if (text) {
            context.text = text;
        }

        const prog_lang = firstEntityValue(entities, 'programming_language');
        if (prog_lang) {
            context.prog_lang = prog_lang;
        }
        cb(context);
    },
    error(sessionId, context, error) {
        console.log(error.message);
    },
    // You should implement your custom actions here
    // See https://wit.ai/docs/quickstart

    ['ask-stack-overflow'](sessionId, context, cb) {
        const recipientId = context._fbid_;

        if (context.text) {
            stackoverflow.main(context.text, context.prog_lang, false, function(answer) {
                console.log(answer);
                FB.fbMessage(recipientId, answer, (err, data) => {
                    if (err) {
                        console.log(
                            'Oops! An error occurred while forwarding the response to',
                            recipientId,
                            ':',
                            err
                        );
                    }
                    cb(context);
                });
            });
        } else {
            sendHelpMessage(recipientId, context, cb);
        }
    }, ['clear-context'](sessionId, context, cb) {
        delete context.text;
        delete context.prog_lang;
        cb(context);
    },
};

function getHelpMessage() {
    var msg = 'Sorry. I don\'t understand. Some things you can ask me:' + '\n\n' +
        'How do I format timestamps in Java?' + '\n\n' +
        'How can I find the largest number of in an array in Swift?' + '\n\n' +
        'What is the difference between null and undefined in JavaScript?';
    
    assert(msg.length <= 320, 'Facebook has a length limit of 320 characters per message.');
    
    return msg;
}

function sendHelpMessage(recipientId, context, callback) {
    FB.fbMessage(recipientId, getHelpMessage(), (err, data) => {
        if (err) {
            console.log(
                'Oops! An error occurred while forwarding the response to',
                recipientId,
                ':',
                err
            );
        }
        callback(context);
    });
}

const getWit = () => {
    return new Wit(Config.WIT_TOKEN, actions);
};

exports.getWit = getWit;

// bot testing mode
if (require.main === module) {
    console.log("Bot testing mode.");
    const client = getWit();
    client.interactive();
}