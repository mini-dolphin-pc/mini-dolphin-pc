import React, { PureComponent } from 'react';
import { DatePicker, Button, Select, Table } from 'antd';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Time from '@/components/Time/time';
import moment from 'moment';
import Authorized from '@/utils/Authorized';
import styles from './Form.less';

const { RangePicker, MonthPicker } = DatePicker;
const { Option, OptGroup } = Select;
const { Secured } = Authorized;
// const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ beforeform, loading }) => ({
  data: beforeform,
  loading: loading.models.beforeform,
}))
class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      total: 0,
    };
  }

  componentDidMount() {
    const { dispatch, data } = this.props;
    console.log(this.props);
    setInterval(() => {
      dispatch({
        type: 'beforeform/changeTime',
        payload: new Date(),
      });
    }, 1000);
    this.setState({
      total: data.data.length,
    });
  }

  handleChange = (_, id) => {
    console.log(id.key, id.props.value);
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf() || moment() < startValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { data } = this.props;
    const { startValue, endValue, endOpen } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <GridContent>
        <div className={styles.wrap}>
          <Time/>
          <ul className={styles.list}>
            {data.list.map((item, index) => {
              return (
                <li key={index} className={styles.listLi}>
                  <p className={styles.num}>{item.num}</p>
                  <p className={styles.name}>{item.name}</p>
                </li>
              );
            })}
          </ul>
          <div className={styles.date}>
            <DatePicker
              disabledDate={this.disabledStartDate}
              showTime
              style={{ marginRight: 20 }}
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
            <DatePicker
              disabledDate={this.disabledEndDate}
              showTime
              style={{ marginRight: 20 }}
              format="YYYY-MM-DD"
              value={endValue}
              placeholder="End"
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
            />
            <Button type="primary" icon="search">
              查询
            </Button>
          </div>
          <div className={styles.choose}>
            {data.type.map((item, index) => {
              return (
                <div key={index} className={styles.chooseDiv}>
                  <span className={styles.typeName}>{item.name}</span>
                  <Select
                    defaultValue={item.select ? item.select[0] : ''}
                    style={{ width: 180 }}
                    onChange={this.handleChange}
                    key={item.id}
                  >
                    {item.select &&
                      item.select.map(i => {
                        return (
                          <Option value={i} key={item.id}>
                            {i}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
              );
            })}
          </div>
          <Table
            rowSelection={rowSelection}
            columns={data.columns}
            dataSource={data.data}
            pagination={{
              // 分页
              showSizeChanger: true,
              showQuickJumper: true,
              total: this.state.total, // 数据总数量
            }}
          />
          <div className={styles.statistics}>
            <div className={styles.shopClassify}>
              <h3 className={styles.title}>商品分类统计(TOP 5)</h3>
              <Table columns={data.statistics} dataSource={data.shopClassify} pagination={false} />
            </div>
            <div className={styles.shopClassify}>
              <h3 className={styles.title}>商品统计</h3>
              <Table columns={data.statistics} dataSource={data.shopClassify} pagination={false} />
            </div>
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Form;
