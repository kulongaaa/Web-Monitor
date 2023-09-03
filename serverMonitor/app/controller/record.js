'use strict';

const { Controller } = require('egg');

class RecordController extends Controller {
  async createRecord() {
    const { ctx } = this;
    let params = ctx.request.body
    let result = await this.app.model.Record.create(params)
    this.ctx.body = result
  }
  async getRecordList() {
    const { ctx } = this;
    let result = await this.app.model.Record.findAll()
    this.ctx.body = {
        data: result,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
    }
  }
}

module.exports = RecordController;