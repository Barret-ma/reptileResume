/**
 * Created by barret.ma on 2017/5/15.
 */

let superagent = require('superagent');
let cheerio = require('cheerio');
let getSetting = require('../readConfig');
let setting = getSetting('qiancheng');
let writeTxt = require('../writeTxt');
let filter711 = [];
let generateIp = require('../randomIp');
let _ = require('underscore');
let getDetail = function(resumeId) {
    let time = _.random(1, 10);
    // console.log('requesting detail page, id is:' + resumeId);
    console.log('http://ehire.51job.com/Candidate/ResumeViewFolder.aspx:', resumeId);
    superagent
        .get('http://ehire.51job.com/Candidate/ResumeViewFolder.aspx')
        // .get('http://ehire.51job.com/Candidate/ResumeViewFolder.aspx')
        .query({hidSeqID: resumeId, hidFolder: 'BAK', pageCode: 10})
        .set('Cookie', setting.cookie)
        .set('X-Forwarded-For', generateIp())
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.49')
        .end(function(err, res) {
            // console.log(res.text);
            if(!res) {
                console.log('error resumuId:' + resumeId);
                return;
            }

            /** 前程无忧 */

            let $ = cheerio.load(res.text);
            let recent = $($('.plate_right')[0]).find('span.bold').text();
            // console.log(res.text);
            // console.log(recent);
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

};

// getDetail(329906454);
// getDetail(329905722);
// getDetail(329886289);
// getDetail(329884988);
// getDetail(329884672);
// getDetail(329884510);
// getDetail(329884334);

//
// getDetail(329883981);
// getDetail(329882366);
// getDetail(329880939);
// getDetail(329880709);
// getDetail(329880531);
// getDetail(329880152);

// getDetail(329880043);
// getDetail(329878639);
// getDetail(329877849);
// getDetail(329876247);
// getDetail(329876060);
// getDetail(329875815);
// getDetail(329875494);


// getDetail(329875033)
// getDetail(329874903)
// getDetail(329874619)
// getDetail(329873807)
// getDetail(329873478)
// getDetail(329867191)
// getDetail(329865938)
// getDetail(329863211)
// getDetail(329862833)