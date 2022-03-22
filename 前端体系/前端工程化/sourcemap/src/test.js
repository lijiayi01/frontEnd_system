const fs = require('fs');
const path = require('path');
const vlq = require('vlq')
var filePath = path.resolve(__dirname, 'main.min.js.map')
fs.readFile( filePath, function(err, result){
    var data = JSON.parse(result.toString());
    var mappings = data.mappings;
    var mappingsArr = mappings.split(',');
    var posArr = mappingsArr.reduce(function(pre, item){
        var pos = vlq.decode(item);
        pos = pos.map((subItem, key)=>{
            return subItem += pre[key] || 0;
        })
        console.log(pos)
        return pos;
    }, [])

    // console.log(posArr)
})