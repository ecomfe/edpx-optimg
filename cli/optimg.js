/**
 * @file optimg.js ~ 2014/07/11 09:49:35
 * @author leeight(liyubei@baidu.com)
 **/

/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * @const
 * @type {Array.<string>}
 */
cli.options = ['force'];

/**
 * @const
 * @type {string}
 */
cli.description = '扫描项目中的图片，优化之';


/**
 * 模块命令行运行入口
 * 
 * @param {Array} args 命令运行参数
 * @param {Object} opts 命令运行选项
 */
cli.main = function (args, opts) {
    require('../index').start(args, opts);
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;











/* vim: set ts=4 sw=4 sts=4 tw=120: */
