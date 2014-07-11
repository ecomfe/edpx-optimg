/**
 * @file lib/util/compress-jpg.js ~ 2014/07/11 10:22:38
 * @author leeight(liyubei@baidu.com)
 **/
var async = require('async');
var edp = require('edp-core');

/**
 * @param {{path:string, size:number}} item
 * @param {function} callback
 */
function executor(item, callback) {
    // jpegtran -optimize -trim ./src/common/img/boot.jpg
    var jpegtran = edp.util.spawn(
        require('jpegtran-bin').path,
        [ '-optimize', '-trim', item.path ]
    );

    var stdout = [];
    jpegtran.stdout.on('data', function(data){
        stdout.push(data);
    });

    jpegtran.on('close', function(code){
        if (code === 0) {
            item.data = Buffer.concat(stdout);
            callback(null, item);
        }
        else {
            callback(new Error(code));
        }
    });
}

/**
 * @param {Array.<Object>} jpgs
 * @return {function}
 */
module.exports = function(jpgs) {
    return function(callback) {
        async.mapLimit(jpgs, 5, executor, function(err, results){
            if (err) {
                callback(null, []);
                return;
            }
            callback(null, results);
        });
    };
};











/* vim: set ts=4 sw=4 sts=4 tw=120: */
