/**
 * Created by barret.ma on 2017/5/15.
 */
/**
 * Created by barret.ma on 2017/5/13.
 */
let superagent = require('superagent');
let cheerio = require('cheerio');
let getSetting = require('../readConfig');
let setting = getSetting('qiancheng');
let writeTxt = require('../writeTxt');
let filter711 = [];
let generateIp = require('../randomIp');
let _ = require('underscore');

module.exports = function(resumeId) {
    let time = _.random(1, 15);
    setTimeout(function() {
        console.log('http://ehire.51job.com/Candidate/ResumeViewFolder.aspx:', resumeId);
        superagent
            .get('http://ehire.51job.com/Candidate/ResumeViewFolder.aspx')
            .query({hidSeqID: resumeId, hidFolder: 'BAK', pageCode: 10})
            .set('Cookie', setting.cookie)
            .end(function(err, res) {
                if(!res) {
                    console.log('error resumuId:' + resumeId);
                    return;
                }
                /** 前程无忧 */
                let $ = cheerio.load(res.text);
                let recent = $($('.plate_right')[0]).find('span.bold').text();

                if(!/7-11|711|柒拾壹|７－１１|7－11|柒-拾壹/.test(recent)) {
                    return;
                }
                filter711.push(resumeId);
                let updateTime = $('#lblResumeUpdateTime').text().trim();
                let id = $('.icard').text().replace('ID:', "").trim();
                let userName = $('.infr').find('.name').text().trim().replace(/流程状态：|\s+标签：/g, '');
                let $age = $($('.infr').find('tr').get(2));
                if($age.hasClass('abc')) {
                    $age = $($('.infr').find('tr').get(3))
                }
                let age = $age.text().split('|')[1].match(/\d+岁?/)[0];
                let phoneNum = $($($('.infr').find('tr').get(1)).find('td').get(1)).text();
                let email = $('.infr').find('.m_com').text();
                let position = $($('.rtbox').find('.txt3')[0]).text();
                let salary = $($($('#divInfo').find('.box')[1]).find('.f16')).text() || 'N/A';
                console.log('filter list length: ', filter711.length + ', name: ' + userName);

                let rows = [userName, age, id, phoneNum, email, position, salary, updateTime];
                writeTxt(rows);
            });
    }, 1000 * time);

};