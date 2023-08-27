'use strict';

const { Controller } = require('egg');

class VideoController extends Controller {
  async list() {
    const { ctx } = this;
    let result = await this.app.model.Video.findAll()
    this.ctx.body = result
  }
}

module.exports = VideoController;
