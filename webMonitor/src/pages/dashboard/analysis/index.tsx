import type { FC } from 'react';
import { Suspense } from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import IntroduceRow from './components/IntroduceRow';
import { useRequest } from 'umi';

import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { AnalysisData } from './data.d';

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

const Analysis: FC<AnalysisProps> = () => {
  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow />
      </Suspense>
    </GridContent>
  );
};

export default Analysis;
