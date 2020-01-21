const KOA = require('./libs/application')

const app = new KOA()

app.use((ctx, next)=>{
    ctx.body = '[11111]';

})  

// app.use(async (ctx, next)=>{
//    ctx.body+= 22222
// })  

app.listen(3000)