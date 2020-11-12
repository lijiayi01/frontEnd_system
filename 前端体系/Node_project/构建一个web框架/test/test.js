const Koa = require('../src/index')

const fs = require('fs')

const path = require('path')

const app = new Koa();

app.get('/', (req, res)=>{
    let html = fs.readFileSync(path.resolve(__dirname, 'static', 'index.html'), 'utf-8')
    console.log(html)
    res.body = html;
})
app.get('/', ()=>{
    console.log('dididididiidid')
})
app.post('/login', (req, res)=>{
    res.body = {
        a: 1,
        b: 2
    }
})

app.listen(8080, ()=>{

})