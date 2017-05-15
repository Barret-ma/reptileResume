/**
 * Created by barret.ma on 2017/5/13.
 */
let excelPort = require('excel-export');
let fs = require('fs');
let path = require('path');

let conf = {};

conf.cols = [
    {caption: '姓名', type: 'string', width: 30},
    {caption: '年龄', type: 'string', width: 30},
    {caption: 'ID', type: 'string', width: 100},
    {caption: '联系方式', type: 'string', width: 100},
    {caption: '邮箱', type: 'string', width: 100},
    {caption: '应聘岗位', type: 'string', width: 50},
    {caption: '目前薪资', type: 'string', width: 50},
    {caption: '更新时间', type: 'string', width: 80}
];

let pathFile = path.join(__dirname, '../exportFile');

let optionsTxt = {
    flag: 'a',
    encoding: 'utf-8'
};

let existFile = fs.existsSync(pathFile);
if(!existFile) {
    fs.mkdirSync(pathFile);
}

module.exports = function(data) {
    let formatStr = JSON.stringify(data) + '|';
    fs.appendFile(path.join(__dirname, '../exportFile/qiancheng.txt'), formatStr, optionsTxt, function(err){
        if(err){
            console.log(err);
        }
    });

};