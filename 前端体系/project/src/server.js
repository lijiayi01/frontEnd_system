const Koa = require('koa');
const crypto = require('crypto');
const app = new Koa();
let token = 'wxPHP'
app.use(async ctx=>{
 console.log(ctx.request.url)
 
})

app.listen(8080,'0.0.0.0');
