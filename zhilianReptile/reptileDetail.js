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
    // console.log('requesting detail page, id is:' + resumeId);
    setTimeout(function() {
        console.log('http://ehire.51job.com/Candidate/ResumeViewFolder.aspx:', resumeId);
        superagent
            .post('http://rd.zhaopin.com/resumepreview/resume/viewone/1/' + resumeId + '?read=n')
            .send({time:7, username:686956247, MAXPAGES:14,PageList1:2, PageList2:2, favorite_id_querystring:10000206,select_unique_id: resumeId})
            .set('Cookie', setting.cookie)
            .end(function(err, res) {
                // console.log(res);
                if(!res) {
                    console.log('error resumuId:' + resumeId);
                    return;
                }
                let $ = cheerio.load(res.text);
                let recent = $($('.workExperience').children('h2').get(0)).text();
                if(!/7-11|711|柒拾壹|７－１１/.test(recent)) {
                    return;
                }
                filter711.push(resumeId);
                let updateTime = $('#resumeUpdateTime').text();
                let id = $('.resume-left-tips-id').text().replace(/[ID:\s]|[^\u0000-\u00FF]+/g, '');
                let userName = $('#userName').text().trim();
                let age = $('.summary-top').find('span').text().replace(/\s/g, '').match(/\d+岁/)[0];
                let $contactInfo = $('#feedbackD02');
                let phoneNum = $contactInfo.find('b').text();
                let email = $contactInfo.find('.mail').text();
                let workExp = $($('.workExperience').children('h5').get(0)).text().split('|') || [];
                let _n = 0;
                if(workExp.length == 3) {
                    _n = 1;
                }
                let position = workExp[_n] && workExp[_n].trim && workExp[_n].trim() || 'N/A';
                let salary = workExp[_n+1] && workExp[_n+1].trim && workExp[_n+1].trim().replace('元/月', '') || 'N/A';

                if(workExp.length == 1) {
                    position = 'N/A';
                    salary = workExp[_n] && workExp[_n].trim && workExp[_n].trim() || 'N/A';
                }
                let rows = [userName, age, id, phoneNum, email, position, salary, updateTime];
                console.log('filter list length: ', filter711.length + ', name: ' + userName);
                writeTxt(rows);
            });
    }, 1000 * time);

};