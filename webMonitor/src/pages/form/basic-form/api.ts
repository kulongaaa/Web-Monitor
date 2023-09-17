// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新建规则 POST /api/rule */
export async function videoUpload(params?: { [key: string]: any },options) {
  return request<API.RuleListItem>('/api/upload/upload', {
    method: 'POST',
    data: params,
    ...(options || {})
  });
}