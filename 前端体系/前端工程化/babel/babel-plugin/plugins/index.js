function plugins(api, options, dirname){
    // console.log(api)
    console.log(options, typeof options)

    return {
       
        inherits:()=>{
            console.log('zheli')
        },
        pre(file){
            console.log(file)
        },
    }
}

module.exports = plugins