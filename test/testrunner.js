var testrunner = require("qunit");

testrunner.options.coverage = true;
testrunner.options.maxBlockDuration = 60000;

testrunner.run([{
    code: "src/pastee.js",
    tests: "test/pastee.js"
}, {
    code: "src/stackoverflow.js",
    tests: "test/stackoverflow.js"
}], function(err, report) {
    if (err)
        console.error(err);
});