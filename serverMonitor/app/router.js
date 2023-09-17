'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/video/list', controller.video.list);
  router.post('/record/createRecord', controller.record.createRecord);
  router.post('/record/getRecordList', controller.record.getRecordList);
  router.post('/upload/upload', controller.upload.videoUpload);

};
