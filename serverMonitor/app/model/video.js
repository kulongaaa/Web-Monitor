
'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // 配置（重要：一定要配置详细，一定要！！！）
  const Video = app.model.define('video', {
    id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
    video_id: { type: STRING(30), allowNull: true, defaultValue: ''},
    title: { type: STRING(200), allowNull: true, defaultValue: '' },
    img: { type: STRING(200), allowNull: true, defaultValue: '' },
    description: { type: STRING(200), allowNull: true, defaultValue: '' },
    created_time: DATE,
    created_at: DATE,
    updated_at: DATE,
  },{
    tableName: 'video', // 自定义数据表名称
 });
 
  return Video;
};