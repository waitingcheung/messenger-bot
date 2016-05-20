test('check Facebook initialization', function() {
    ok(fbReq, 'Facebook initialization succeeds');
});

test('send Facebook message', function() {
    expect(1);
    stop();

    setTimeout(function() {
        fbMessage(1234567890, 'Hello World', function(err, data) {
            ok(err === '(#100) Invalid fbid.', 'Callback error received');
            start();
        });
    }, 0);
});

test('get message', function() {
    // From https://github.com/hunkim/Wit-Facebook/blob/master/__tests__/facebook_test.js
    var payload = {
        object: "page",
        entry: [{
            "id": FB_PAGE_ID,
            "time": 1460245674269,
            "messaging": [{
                "sender": {
                    "id": "USER_ID"
                },
                "recipient": {
                    "id": "PAGE_ID"
                },
                "timestamp": 1460245672080,
                "message": {
                    "mid": "mid.1460245671959:dad2ec9421b03d6f78",
                    "seq": 216,
                    "text": "in Hong Kong?"
                }
            }]
        }]
    };

    var ret = getFirstMessagingEntry(payload);
    ok(ret.message.text === 'in Hong Kong?', 'Got message');
});