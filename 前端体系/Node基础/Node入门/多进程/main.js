const fs = require('fs');
const child_process = require('child_process');

for(let i = 0; i< 3; i++){
    var workspace = child_process.exec('node index.js ' + i, function(err, stdout, stderr){
        if(err){
            console.log(err)
        }else{
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        }
    })
    // console.log(workspace);

    workspace.on('exit', function(code){
        console.log('子进程已退出，退出码 '+code);
    })
}