// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新建规则 POST /api/rule */
export async function createRecord(params?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/record/createRecord', {
    method: 'POST',
    data: params,
  });
}