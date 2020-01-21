const deledates = require('../util/util').deledates
const context = {
   
}

function mount(context) {
    // 挂载request
    deledates(context, 'request')
        .getter('url')
        .getter('method')
        .getter('query')

    // 挂载response
    deledates(context, 'response')
        .access('body')
        .access('status')

}



module.exports = {
    mount: mount,
    context: context

}

