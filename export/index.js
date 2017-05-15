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

let options = {
    flag: 'a',
    encoding: 'binary'
};

fs.readFile(path.join(__dirname, '../exportFile/qiancheng.txt'), 'utf-8', function(err, data) {
    let rows = [];
    let arr = data.split('|');
    arr.forEach(item => {
        if(!item) return;
        rows.push(JSON.parse(item));
    });

    conf.rows = rows;
    let result = excelPort.execute(conf);
    fs.appendFile(path.join(__dirname, '../exportFile/qiancheng.xlsx'), result, options, function(err){
        if(err){
            console.log(err);
        }
    });
});