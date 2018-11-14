import React, { createRef, Component } from 'react';
import { connect } from 'dva';
import { TimelineChart } from 'ant-design-pro/lib/Charts';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Time from '@/components/Time/time';
// import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';
import { DatePicker, Card, Tabs, Input, Table } from 'antd';
const Search = Input.Search;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
import styles from './homeview.less';

//连接model层的state数据，然后通过this.props.state名(namespace)访问model层的state数据
@connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/fetch'],
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

  componentDidMount() {}

  handleRangePickerChange = (rangePickerValue, type) => {
    // 选择的日期
    console.log(type);
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'echart/fetchSalesData',
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
    const {home}=this.props;
    console.log(home)
    const visitData = [];
    const chartData = [];
    for (let i = 0; i < 20; i += 1) {
      chartData.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    const { rangePickerValue } = this.state;
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
              <TabPane tab="xx" key="sales"></TabPane>
            </Tabs>
          </div>
          <div className={styles.wrap}>
            <div className={styles.todaysales}><span>今日销售量</span><Time /></div>
            <ul className={styles.list}>
              { home.sale.map((item,index)=>{
                  return <li key={index} className={styles.saleList}>
                    <p>{item.title}</p>
                    <p>{item.num}</p>
                  </li>
                 })
               }
            </ul>
            <div className={styles.statistics}>
              <div style={{width:"45%"}}>
                <h3 style={{textAlign:"center"}}>销售额</h3>
                <TimelineChart
                  height={200}
                  data={chartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />
              </div>
              <Row style={{width:"50%"}}>
                <div className={styles.bar}>
                  <h3>总销售额同上期</h3>
                  <div className={styles.barmassage}>
                    <div className={styles.barprocess}>
                      <div className={styles.barup} style={{width:"70%"}}>
                        <div className={styles.barmonth} style={{width:"70%"}}></div>
                      </div>
                    </div>
                    <span>10%</span>
                  </div>
                </div>
                <div className={styles.bar}>
                  <h3>油品同上期</h3>
                  <div className={styles.barmassage}>
                    <div className={styles.barprocess}>
                      <div className={styles.barup} style={{width:"70%"}}>
                        <div className={styles.barmonth} style={{width:"70%"}}></div>
                      </div>
                    </div>
                    <span>10%</span>
                  </div>
                </div>
                <div className={styles.bar}>
                  <h3>便利店同上期</h3>
                  <div className={styles.barmassage}>
                    <div className={styles.barprocess}>
                      <div className={styles.barup} style={{width:"70%"}}>
                        <div className={styles.barmonth} style={{width:"70%"}}></div>
                      </div>
                    </div>
                    <span>10%</span>
                  </div>
                </div>
              </Row>
            </div>
            <div className={styles.oilsGan}>
              <p>油品统计</p>
              <Time/>
            </div>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Index;
