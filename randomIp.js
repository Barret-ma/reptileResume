/**
 * Created by barret.ma on 2017/5/13.
 */
var _ = require('underscore');
module.exports = function() {
    let ip = _.random(1 , 254)
        + "." + _.random(1 , 254)
        + "." + _.random(1 , 254)
        + "." + _.random(1 , 254);
    return ip;
};