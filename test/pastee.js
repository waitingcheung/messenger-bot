test("paste a text", function() {
    expect(1);
    stop();

    setTimeout(function() {
        pasteContent('text', function(url) {
            ok(url.startsWith('http://paste.ee/p/'), 'Paste successfully');
            start();
        });
    }, 10000);
});