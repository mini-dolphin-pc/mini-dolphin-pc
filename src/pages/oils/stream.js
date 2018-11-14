import React, { createRef, Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
// import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';
import { DatePicker, Card, Tabs, Input, Table, Select } from 'antd';
import styles from './stream.less';
const Option = Select.Option;
const Search = Input.Search;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

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
      data: [
        {
          key: '1',
          num: '5641564156341',
          time: '2018/2/2 9:00',
          tel: '888888888888',
          payType: '支付宝',
          should: 200,
          money: 198,
          price: 6.27,
          shop: 92,
          jf: 0,
          yh: 2,
          yl: 29.76,
          detail: '正常',
        },
        {
          key: '2',
          num: '5641564156341',
          time: '2018/2/2 9:00',
          tel: '888888888888',
          payType: '支付宝',
          should: 200,
          money: 198,
          price: 6.27,
          shop: 92,
          jf: 0,
          yh: 2,
          yl: 29.76,
          detail: '正常',
        },
        {
          key: '3',
          num: '5641564156341',
          time: '2018/2/2 9:00',
          tel: '888888888888',
          payType: '支付宝',
          should: 200,
          money: 198,
          price: 6.27,
          shop: 92,
          jf: 0,
          yh: 2,
          yl: 29.76,
          detail: '正常',
        },
      ],
      columns: [
        {
          title: '订单编号',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '交易时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '手机号',
          key: 'tel',
          dataIndex: 'tel',
        },
        {
          title: '支付方式',
          key: 'payType',
          dataIndex: 'payType',
        },
        {
          title: '应付金额',
          key: 'should',
          dataIndex: 'should',
        },
        {
          title: '优惠金额',
          key: 'yh',
          dataIndex: 'yh',
        },
        {
          title: '积分抵扣',
          key: 'jf',
          dataIndex: 'jf',
        },
        {
          title: '实付金额',
          key: 'money',
          dataIndex: 'money',
        },
        {
          title: '商品',
          key: 'shop',
          dataIndex: 'shop',
        },
        {
          title: '单价',
          key: 'price',
          dataIndex: 'price',
        },
        {
          title: '油量',
          key: 'yl',
          dataIndex: 'yl',
        },
        {
          title: '状态',
          key: 'detail',
          dataIndex: 'detail',
          render: () => {
            return (
              <div className={styles.detail} onClick={() => this.alert(id)}>
                详情
              </div>
            );
          },
        },
      ],
    };
  }

  componentDidMount() {}

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  handleBlur = () => {
    console.log('blur');
  };

  handleFocus = () => {
    console.log('focus');
  };

  handleRangePickerChange = (rangePickerValue, type) => {
    // 选择的日期
    console.log(type);
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
      total: this.state.data.length,
    });

    dispatch({
      type: 'echart/fetchSalesData',
    });
  };

  alert = () => {
    console.log(11);
  };

  selectDate = type => {
    this.handleRangePickerChange();
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
      total: this.state.data.length,
    });
    //选中的时间
    console.log(getTimeDistance(type));

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
    const { rangePickerValue, total, data, columns } = this.state;
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
        <div className={styles.chooseSelect}>
          <span className={styles.oils}>油品</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择油品"
            optionFilterProp="children"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="92#">92#</Option>
            <Option value="95#">95#</Option>
            <Option value="98#">98#</Option>
            <Option value="101#">101#</Option>
            <Option value="0#">0#</Option>
          </Select>
        </div>
      </div>
    );

    return (
      <GridContent>
        {/* 日期选择 */}
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra}>
              <TabPane tab="xx" key="sales" />
            </Tabs>
          </div>
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
