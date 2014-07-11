/**
 * @file lib/util/scan.js ~ 2014/07/11 09:57:40
 * @author leeight(liyubei@baidu.com)
 **/
var fs = require('fs');
var edp = require('edp-core');
var path = require('path');

/**
 * 扫描目录，获取待处理的文件列表
 * @param {Array.<string>} args 命令行参数
 * @return {{jpg:Array.<string>, png:Array.<string>}}
 */
module.exports = function(args) {
    var jpgs = [];
    var pngs = [];


    var cwd = process.cwd();

    if (!args.length) {
        // 没有参数
        args.push(cwd);
    }

    function addFile(file) {
        file = path.relative(cwd, file);
        var stat = fs.statSync(file);

        if (/\.png$/.test(file)) {
            pngs.push({path: file, size: stat.size});
        }
        else if (/\.jpe?g$/.test(file)) {
            jpgs.push({path: file, size: stat.size});
        }
    }

    for (var i = 0; i < args.length; i ++) {
        var item = path.resolve(args[i]);
        if (!fs.existsSync(item)) {
            continue;
        }

        var stat = fs.statSync(item);
        if (stat.isDirectory()) {
            // 扫描目录
            edp.util.scanDir(item, addFile);
        }
        else if (stat.isFile()) {
            // 单独的文件
            addFile(item);
        }
    }

    return {
        png: pngs,
        jpg: jpgs
    };
};










/* vim: set ts=4 sw=4 sts=4 tw=120: */
