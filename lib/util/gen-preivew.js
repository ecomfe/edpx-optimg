/**
 * @file lib/util/gen-preivew.js ~ 2014/07/11 13:33:31
 * @author leeight(liyubei@baidu.com)
 **/
var etpl = require('etpl');
var fs = require('fs');
var path = require('path');

etpl.config({
    strip: true
});

etpl.addFilter('base64', function(buffer){
    return buffer.toString('base64');
});

/**
 * 生成预览的html文件
 * @param {Array.<Object>} items
 * @param {string} file 输出的文件名.
 */
module.exports = function(items, file) {
    var render = etpl.compile(
        fs.readFileSync(path.join(__dirname, 'preview.tpl'), 'utf-8'));
    var html = render({items: items});
    fs.writeFileSync(file, html);
};










/* vim: set ts=4 sw=4 sts=4 tw=120: */
