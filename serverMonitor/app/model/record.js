
'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // 配置（重要：一定要配置详细，一定要！！！）
  const Record = app.model.define('record', {
    id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
    video_id: { type: STRING(30), allowNull: true, defaultValue: ''},
    type: { type: INTEGER(20), allowNull: true },
    time: { type: STRING(30), allowNull: true, defaultValue: ''},
  },{
    tableName: 'record', // 自定义数据表名称
 });
 
  return Record;
};