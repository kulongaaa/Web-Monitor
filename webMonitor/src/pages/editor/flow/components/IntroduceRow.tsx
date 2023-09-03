import { Col, Row, Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import axios from 'axios';
import { getVideoList } from './api'

const { Meta } = Card;

const topColResponsiveProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const cardList = await getVideoList()
console.log('111', cardList)

const IntroduceRow = () => (
  <Row gutter={24}>
    {cardList && cardList.map(e => (
      <Col {...topColResponsiveProps}>
        <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={e.img}
          />
        }
        actions={[
          <Link
          to={
            {
              pathname: "/editor/koni",
              state: {source: e.source,videoId: e.video_id}
            }
          }>
            <SettingOutlined key="setting" />
          </Link>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={e.title}
          description={e.description}
        />
      </Card>
      </Col>
      )
      )}
  </Row>
);

export default IntroduceRow;
