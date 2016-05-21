var ratelimit = 15000;

test("ask stack overflow", function() {
    expect(1);
    stop();

    setTimeout(function() {
        main('sort array', 'javascript', false, function(answer) {
            ok(answer, 'Answer found');
            start();
        });
    }, ratelimit);
});

test("ask stack overflow with random question", function() {
    expect(1);
    stop();

    setTimeout(function() {
        main('dkssud', 'javascript', false, function(answer) {
            ok(answer === 'Sorry, I cannot find any reasonable answer for your query.', 'Should not find any answer');
            start();
        });
    }, ratelimit);
});


test("ask stack overflow without any languages", function() {
    expect(1);
    stop();

    setTimeout(function() {
        main('sort array', undefined, false, function(answer) {
            ok(answer, 'Answer found');
            start();
        });
    }, ratelimit);
});

test("ask stack overflow with long answer", function() {
    expect(1);
    stop();

    setTimeout(function() {
        main('difference between null and undefind', 'javascript', false, function(answer) {
            ok(answer, 'Answer found');
            start();
        });
    }, ratelimit);
});

test("ask stack overflow a question with an answer having no code blocks", function() {
    expect(1);
    stop();

    setTimeout(function() {
        main('document.write considered a bad practice', 'javascript', false, function(answer) {
            ok(answer, 'Answer found');
            start();
        });
    }, ratelimit);
});