/**
 * @file lib/util/compress-png.js ~ 2014/07/11 10:17:42
 * @author leeight(liyubei@baidu.com)
 **/
var async = require('async');
var edp = require('edp-core');
var path = require('path');
var os = require('os');
var fs = require('fs');


/**
 * @param {{path:string, size:number}} item
 * @param {function} callback
 */
function executor(item, callback) {
    var tmp = path.join(os.tmpdir(),
        Math.floor(Math.random() * 2147483648).toString(36) + '.png');

    // optipng src/ui/img/dragbg.png -out /tmp/a.png
    var optipng = edp.util.spawn(
        require('optipng-bin').path,
        [ item.path, '-out', tmp ]
    );

    optipng.on('close', function(code){
        if (code === 0) {
            item.data = fs.readFileSync(tmp);
            fs.unlinkSync(tmp);
            callback(null, item);
        }
        else {
            callback(new Error(code));
        }
    });
}

/**
 * @param {Array.<Object>} pngs
 * @return {function}
 */
module.exports = function(pngs) {
    return function(callback) {
        async.mapLimit(pngs, 5, executor, function(err, results){
            if (err) {
                callback(null, []);
                return;
            }
            callback(null, results);
        });
    };
};










/* vim: set ts=4 sw=4 sts=4 tw=120: */
