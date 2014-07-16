/**
 * @file index.js ~ 2014/07/11 09:51:02
 * @author leeight(liyubei@baidu.com)
 **/
var fs = require('fs');
var async = require('async');
var edp = require('edp-core');

exports.start = function(args, opts) {
    var candidates = require('./lib/util/scan')(args);

    var tasks = [
        require('./lib/util/compress-png')(candidates.png),
        require('./lib/util/compress-jpg')(candidates.jpg)
    ];


    var overwrite = opts.force;

    function dump(items, file) {
        if (!items.length) {
            return;
        }

        items.sort(function(a, b){
            var da = a.size - a.data.length;
            var db = b.size - b.data.length;
            return (db - da);
        });

        var previewItems = [];
        items.forEach(function(item){
            if (item.size <= item.data.length) {
                return;
            }

            var p = 100 * (item.size - item.data.length) / item.size;
            previewItems.push(item);

            edp.log.info('%s %s -> %s, %s%%',
                item.path, item.size, item.data.length,
                p.toFixed(2));
            if (overwrite) {
                fs.writeFileSync(item.path, item.data);
            }
        });

        if (previewItems.length) {
            require('./lib/util/gen-preivew')(previewItems, file);
            edp.log.info('Generated %s', file);
        }
    }

    async.series(tasks, function(err, results){
        dump(results[0], 'edpx-optimg-png.html');
        dump(results[1], 'edpx-optimg-jpg.html');
    });
};










/* vim: set ts=4 sw=4 sts=4 tw=120: */
