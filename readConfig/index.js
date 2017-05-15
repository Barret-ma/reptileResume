/**
 * Created by barret.ma on 2017/5/13.
 */

var fs = require('fs');
var path = require('path');

module.exports = function(settingName) {
    var setting = fs.readFileSync(path.join(__dirname, '../settings/' + settingName + '.json'), 'utf-8');
    return JSON.parse(setting);
};