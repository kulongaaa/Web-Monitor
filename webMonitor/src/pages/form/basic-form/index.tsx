import { Card, message,Upload, Button } from 'antd';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import styles from './style.less';
import { videoUpload } from './api'

const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:8000/api/upload/upload',
  headers: {
    authorization: 'authorization-text',
  },
  customRequest: async ({ file }) => {
    let param = new FormData();
    param.append('files', file) // 通过append向form对象添加数据 
  
    const res = await videoUpload(param, {
      'Content-type': 'multipart/form-data'
    });
  },
  onChange(info) {
    console.log(info)
    // 声明 FormData 实例 formData
    let file = info.file
    let formData = new FormData() 
    formData.append('files', file)
    console.log(file, formData)
    // videoUpload(formData).then(res => {
    // })
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const BasicForm: FC<Record<string, any>> = () => {

  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <Card bordered={false}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>点击上传视频</Button>
        </Upload>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
