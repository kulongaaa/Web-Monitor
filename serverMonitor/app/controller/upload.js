'use strict';

const fs = require('fs'); // 引入fs，node 自带的文件处理工具
const mkdirp = require('mkdirp'); // 引入文件夹处理工具
const path = require('path'); // 引入路径处理工具
const moment = require('moment');
const { Controller } = require('egg');

class UploadController extends Controller {
  async videoUpload() {
    const { ctx } = this
    // 1 获取我们上传文件。 是一个数组，只有一个文件情况下，默认为数组中的下标0。
    let file = ctx.request.files[0]
    // 2 声明存放资源的路径
    let uploadDir = 'app/public/upload'
    const day = moment(new Date()).format('YYYYMMDD');
    try {
      // 3 读取文件内容
      let f = fs.readFileSync(file.filepath)
      // 5 生成文件最后要保存的路径地址
      console.log('f',f)
      let dir = path.join(uploadDir);
    //   await mkdirp(dir); // 6 这个方法是，如果 上述dir 路径存在，那就不创建，如果不存在则会创建这个对应目录文件夹
      // 7 返回图片保存的完整路径
      uploadDir = path.join(dir,file.filename);
      // 8 将图片内容写入到文件夹下
      fs.writeFileSync(uploadDir, f)
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }
  
    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/, ''),// 删除 /app/ 这个目录
    }
  }
}


module.exports = UploadController;