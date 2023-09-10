import { Card, Col, Row, Statistic, Button, Select, Slider } from 'antd';
import type { FC } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import ReactPlayer from 'react-player';
import React from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import ProTable from '@ant-design/pro-table';
import { createRecord , getRecordList } from './api'
import type { TableListItem, TableListPagination } from './data'; 


export default class Monitor extends React.Component {
  state = {
    slideValue: 0, // 进度条当前取值
    playing: false, // 视频true播放 false暂停
    playbackRate: 1, // 视频播放倍速
    timeConsuming: 0, // 本页耗时
    duration: 10, // 视频总时长 
    controllerTimeConsuming: true, // 本页计时开关 true:计时中   false:计时暂停
    columns: [
      {
        title: '时间点',
        dataIndex: 'time'
      },
      {
        title: '操作类型',
        dataIndex: 'type',
        hideInForm: true,
        valueEnum: {
          1: {
            text: '暂停',
            status: 'Default',
          },
          2: {
            text: '快速倍速',
            status: 'Processing',
          },
          3: {
            text: '慢速倍速',
            status: 'Success',
          }
        },
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => [
          <Button
          onClick={() => {
            this.posVideo(record)
          }}
          >
            定位播放位置
          </Button>
        ],
      },
    ]
  };
  // 操作视频播放组件的对象
  ref = (player: any) => {
    this.player = player;
  };

  // 设置视频播放倍速
  handleVideoSpeedChange = (value: string) => {
    this.setState({ playbackRate: value });
    if(Number(value) > 1) {
      createRecord({video_id: this.props.location.state.videoId,type: 2,time: this.state.slideValue})
    } else {
      createRecord({video_id: this.props.location.state.videoId,type: 3,time: this.state.slideValue})
    }
  };
  // 视频进度条改变
  handleSliderChange = (value: string) => {
    this.setState({ slideValue: value }); // 设置进度条当前值
    this.player.seekTo(parseFloat(value)); // 改变视频进度
  };
  // 时间格式化
  formatTimeConsuming = (val: string) => {
    const formateDate = parseInt(val, 0) || this.state.timeConsuming;
    if (formateDate > 60) {
      const m = formateDate / 60; // 分钟
      const s = formateDate - 60 * m; // 秒
      let res = '';
      if (m < 10) {
        res += `0${m}:`;
      } else {
        res += `${m}:`;
      }
      if (s < 10) {
        res += `0${s}`;
      } else {
        res += `${s}`;
      }
      return res;
    }
    if (formateDate < 10) {
      return `00:0${formateDate}`;
    }
    return `00:${formateDate}`;
  };

  // 视频总时长
  handleDuration = (duration: number) => {
    this.setState({ duration });
  };
  // 当前播放进度
  handleProgress = (state: any) => {
    this.setState({ slideValue: parseFloat(state.playedSeconds) });
  };


  componentWillMount(){
  } 

  posVideo(e: any) {
    this.setState({ slideValue: e.time });
  }

  render(): React.ReactNode {
    const { slideValue, duration, playing, playbackRate, controllerTimeConsuming, columns } = this.state;
    return (
      <GridContent>
        <ReactPlayer
          ref={this.ref}
          height="300px"
          style={{ width: '100%' }}
          playing={playing}
          playbackRate={playbackRate}
          onDuration={this.handleDuration}
          onProgress={this.handleProgress}
          url={this.props.location.state.source}
        />
        <Button onClick={() => {this.setState({ playing: !playing });createRecord({video_id: this.props.location.state.videoId,type: 1,time: slideValue})}}>
          {playing ? '暂停' : '播放'}
        </Button>
        <Select
          showArrow={false} // 不显示小箭头
          defaultValue={playbackRate}
          onChange={this.handleVideoSpeedChange}
        >
          <Select.Option value={0.5}>0.5x</Select.Option>
          <Select.Option value={0.75}>0.75x</Select.Option>
          <Select.Option value={1}>1x</Select.Option>
          <Select.Option value={1.25}>1.25x</Select.Option>
          <Select.Option value={1.5}>1.5x</Select.Option>
          <Select.Option value={2}>2x</Select.Option>
        </Select>
        <Slider
          style={{ marginBottom: 10 }}
          value={slideValue}
          max={duration}
          step={0.01}
          onChange={this.handleSliderChange}
          tipFormatter={(val: string) => this.formatTimeConsuming(val)}
        />
        <ProTable<TableListItem, TableListPagination>
          headerTitle="监控表格"
          rowKey="key"
          columns={columns}
          request={getRecordList}
        />
      </GridContent>
    );
  }
}
