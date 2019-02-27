function getData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let num = Math.random()
            resolve(num)
        },1000)
    })
}

getData().then((res)=>{
    console.log(res);
    return getData()
}).then((res)=>{
    console.log(res)
})