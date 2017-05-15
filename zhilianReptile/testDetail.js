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
            .get('http://rd.zhaopin.com/resumepreview/resume/viewone/1/' + resumeId + '?read=n')
            .send({time:7, username:687703452, MAXPAGES:6,PageList1:2, PageList2:2, favorite_id_querystring:10000206,select_unique_id: resumeId})
            .set('Cookie', setting.cookie)
            // .set('X-Forwarded-For', generateIp())
            // .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.49')
            .end(function(err, res) {
                // console.log(res.text);
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

                let rows = [userName, age, id, phoneNum, email, position, salary, updateTime];

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


getDetail(329875033)
getDetail(329874903)
getDetail(329874619)
getDetail(329873807)
getDetail(329873478)
getDetail(329867191)
getDetail(329865938)
getDetail(329863211)
getDetail(329862833)