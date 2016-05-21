const how2 = require('../node_modules/how2/lib/how2');
const utils = require('../node_modules/how2/lib/utils');
const assert = require('assert');
const stackexchange = require('stackexchange');
const _ = require('lodash');
const htmlentities = require('ent');
const pastee = require('./pastee');
const md = require('markdown-it')();

var options = {
    version: 2.2
};
var context = new stackexchange(options);

function search(text, lang, remember, callback) {
    lang = lang || 'JavaScript';
    how2.search(text, lang, function(links, titles) {
        var selectItem = selectedGoogleItemCallback(links, function(answers) {
            if (answers) {
                var remember = {
                    links: links,
                    titles: titles
                };
                selectedAnswer(titles, answers, 0, remember, lang, callback);
            } else {
                callback('Sorry, I cannot find any reasonable answer for your query.');;
            }
        });
        selectItem(0);
    });
}

function afterSearch(links, titles, callback) {
    selectedGoogleItemCallback(links, function(answers) {
        // console.log(answers[0]);
        callback(answers[0]);
    });
}

function selectedGoogleItemCallback(links, callback) {
    return function(index) {
        if (links.length === 0) {
            // console.error('Sorry, I cannot find any reasonable answer for your query.');
            // process.exit(1);
            callback(undefined);
        } else {
            var selectedLink = links[index];
            var parsedLink = utils.parseStackoverflowQuestionId(selectedLink.link);
            fetchQuestionAnswers(parsedLink, callback);
        }
    };
}

function fetchQuestionAnswers(parsedLink, callback) {
    assert(parsedLink);
    var questionCriteria = {
        filter: '!-*f(6s6U8Q9b' // body_markdown and link
    };
    questionCriteria.site = parsedLink.site;
    context.questions.answers(questionCriteria, function(err, results) {
        if (err) {
            console.error('Cannot fetch answers from Stackoverflow.');
            console.error(err);
            process.exit(1);
        }
        if (results.error_id) {
            console.error(results);
            process.exit(1);
        }

        var answers = _.sortBy(results.items, function(answer) {
            return -answer.score;
        });

        callback(answers);

    }, [parsedLink.questionId]);
}

function selectedAnswer(titles, answers, index, remember, lang, callback) {
    if (answers.length === 0) {
        console.log('Cannot find any reasonable answer for your query.');
        if (!lang) {
            console.log('To get the best answers, make sure you specify the language');
        }
        process.exit(1);
    }

    var bodyMarkdown = answers[index].body_markdown;
    var codeBlocks = findCodeBlocks(bodyMarkdown);

    if (codeBlocks.length > 0) {
        // Answer contains some code blocks.
        var code = '';
        for (var i = 0; i < codeBlocks.length; i++) {
            code += htmlentities.decode(codeBlocks[i].content) + '\n';
        }
        code = code.slice(0, -1);

        pastee.pasteContent({
            paste: code,
            language: getPasteLanguage(lang)
        }, function(url) {
            pasteMarkdown(bodyMarkdown, true, function(data) {
                var button = (typeof data === 'string') ? createButton(url, data) : createButton(url, data.text, data.url);
                callback(button);
            });
        });
    } else {
        // Answer does not contain any code blocks. Return the answer as it is.
        pasteMarkdown(bodyMarkdown, false, callback);
    }
}

function findCodeBlocks(markdown) {
    return md.parse(markdown, {}).filter(function(token) {
        return token.type === 'code_block';
    });
}

function getPasteLanguage(lang) {
    var values = {
        'bash': 'bash',
        'c': 'c',
        'c++': 'cpp',
        'java': 'java',
        'javascript': 'javascript',
        'php': 'php',
        'python': 'python',
        'ruby': 'ruby'
    };
    return values[lang.toLowerCase()] || 'plain';
}

function pasteMarkdown(bodyMarkdown, separateURL, callback) {
    var markdown = htmlentities.decode(bodyMarkdown);

    if (separateURL) {
        if (markdown.length >= 320) {
            pastee.pasteContent(markdown, function(url) {
                callback({
                    text: markdown.substring(0, 319),
                    url: url
                });
            });
        } else {
            callback(markdown);
        }
    } else {
        if (markdown.length >= 290) {
            pastee.pasteContent(markdown, function(url) {
                callback(markdown.substring(0, 289) + ' ...\n' + url);
            });
        } else {
            callback(markdown);
        }
    }
}

function createButton(codeURL, text, textURL) {
    var button = {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": text,
            "buttons": [{
                "type": "web_url",
                "url": codeURL,
                "title": "Download Code"
            }]
        }
    };

    if (textURL) {
        button.payload.buttons.unshift({
            "type": "web_url",
            "url": textURL,
            "title": "Read Remaining"
        });
    }

    return button;
}

function main(text, lang, remember, callback) {
    search(text, lang, afterSearch, callback);
    /*
    if (!remember) {
        search(text, lang, afterSearch, callback);
    } else {
        afterSearch(remember.links, remember.titles, callback);
    }
    */
}

module.exports = {
    main: main
}