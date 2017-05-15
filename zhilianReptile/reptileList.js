/**
 * Created by barret.ma on 2017/5/13.
 */
let superagent = require('superagent');
let cheerio = require('cheerio');
let getSetting = require('../readConfig');
let parseDetail = require('./reptileDetail');
let setting = getSetting('qiancheng');
let generateIp = require('../randomIp');
module.exports = function() {
    [2].forEach(page => {
        //
        superagent
            .post('http://rd2.zhaopin.com/s/resuadmi/ShowFavoriteResumes_recent.asp')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Cookie', setting.cookie)
            // .set('X-Forwarded-For', generateIp())
            .send({PageNo:page, username:686956247, time:7,  MAXPAGES:14})
            .end(function(err, res) {
                // console.log(res.text);
                var $ = cheerio.load(res.text);

                var $personItem = $('input[name="chkid"]').toArray();

                $personItem.forEach(item => {
                    let id = $(item).data('resguid');
                    parseDetail(id)
                });

            });
    });

};