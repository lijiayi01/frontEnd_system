const fs = require('fs');
const path = require('path');

function getEntry() {
    // 所有页面的基础目录
    let basicPagepath = path.resolve(__dirname, '../src/page');
    // 各个页面目录
    let dirs = fs.readdirSync(basicPagepath);

    return dirs.map((item, key) => {
        return {
            [item]: {
                js: path.resolve(__dirname, '../src/page', `${item}/index.js`),
                html: path.resolve(__dirname, '../src/page', `${item}/index.html`)
            }

        }
    })
}
module.exports = getEntry;