import React, { createRef, Component } from 'react';
import { connect } from 'dva';
// import {NavLink} from 'react-dom';
// import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'umi/locale';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
// import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';
import { DatePicker, Card, Tabs, Input, Table } from 'antd';
const Search = Input.Search;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
import styles from './stream.less';

//连接model层的state数据，然后通过this.props.state名(namespace)访问model层的state数据
@connect(({ echart, loading }) => ({
  echart,
  loading: loading.effects['echart/fetch'],
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.gw = createRef();
    this.xl = createRef();
    this.state = {
      rangePickerValue: getTimeDistance('year'),
      total: 0,
    };
  }

  componentDidMount() {
    let { option, options, data } = this.props.echart;
    this.setState({
      total: data.length,
    });
    echarts.init(this.gw.current).setOption(option, true);
    echarts.init(this.xl.current).setOption(options, true);
  }

  handleRangePickerChange = (rangePickerValue, type) => {
    // 选择的日期
    console.log(type);
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.handleRangePickerChange();
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'echart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, total } = this.state;
    const { data, columns } = this.props.echart;
    const salesExtra = (
      <div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 300 }}
        />
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            <FormattedMessage id="app.analysis.today" defaultMessage="当天" />
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            <FormattedMessage id="app.analysis.toweek" defaultMessage="周" />
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            <FormattedMessage id="app.analysis.tomonth" defaultMessage="月" />
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            <FormattedMessage id="app.analysis.toyear" defaultMessage="年" />
          </a>
        </div>
      </div>
    );

    return (
      <GridContent>
        {/* 日期选择 */}
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra}>
              <TabPane tab="xx" key="sales">
                {/* <div className={styles.oils}>油品</div> */}
              </TabPane>
            </Tabs>
          </div>
        </Card>
        <Card bordered={false} bodyStyle={{ padding: 0 }} className={styles.search}>
          <div style={{ width: '100%', height: 300 }} ref={this.gw} />
          <div style={{ width: '100%', height: 300 }} ref={this.xl} />
          <Search
            placeholder="订单、手机号"
            onSearch={value => console.log(value)}
            enterButton
            style={{ width: 300, marginBottom: 10 }}
          />
          <Table
            columns={columns}
            dataSource={data}
            bordered={true}
            pagination={{
              // 分页
              showSizeChanger: true,
              showQuickJumper: true,
              total: total, // 数据总数量
            }}
          />
        </Card>
      </GridContent>
    );
  }
}

export default Index;
