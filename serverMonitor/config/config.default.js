/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // config/config.default.js
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'monitor',
    username: 'root',
    password: '12345678',
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1692526013132_810';
  config.security = {
    csrf:{
        enable: false,
    }
  }
  // add your middleware config here
  config.middleware = [];


  config.multipart = {
    mode: 'file',
    whitelist:['.docx']
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
