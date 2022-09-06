import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const StatisticView = (props) => (
  <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Alread Minted NFT"
            value={props.minted}
            valueStyle={{
              color: '#3f8600',
            }}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="NFT TotalSupply"
            value={props.totalSupply}
            valueStyle={{
              color: '#cf1322',
            }}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export default StatisticView;