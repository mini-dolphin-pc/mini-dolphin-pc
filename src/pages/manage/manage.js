import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Select,Icon,Table} from 'antd';
import styles from './manage.less';
import './manage.css';

@connect(state => ({
  isloading: state.error.isloading,
}))
class Manage extends PureComponent {
  state = {
    // isloading: false,
   dataSource:[{
      key: '1',
      id:1,
      account:'zhangsan',
      name: '张三',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    }, {
      key: '2',
      id:2,
      account:'lisi',
      name: '李四',
      sex:"保密",
      email: '111@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '3',
      id:3,
      account:'demo',
      name: '测试',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '4',
      id:4,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '5',
      id:5,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '6',
      id:6,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '7',
      id:7,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '8',
      id:8,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '9',
      id:9,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '10',
      id:10,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '11',
      id:11,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    },{
      key: '12',
      id:12,
      account:'wangwu',
      name: '王五',
      sex:"保密",
      email: '123@163.com',
      tel: '13888888888',
      time:'2018-10-29',
      type:'启用'
    }],
    columns :[{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '邮件',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '状态',
      dataIndex: 'type',
      key: 'type',
    }]
  };
  

//   triggerError = code => {
//     this.setState({
//       isloading: true,
//     });
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'error/query',
//       payload: {
//         code,
//       },
//     });
//   };

  render() {
    // const { isloading } = this.state;
    return (
      <div className={styles.user_body}>
          <div className={styles.user_content}>
              <div className={styles.user_content_add}>
                  <div className={styles.add_button}>
                      <div className={styles.add_btn}>
                          <Icon type="plus-circle"></Icon>
                          <span className={styles.add_fontcolor}>新增</span>
                      </div>
                      <div className={styles.add_input}>
                          <div>
                              <input type="text" title="账号" className={styles.add_inputelement} placeholder="请输入账号"/>
                              <input type="text" title="姓名" className={styles.add_inputelement} placeholder="请输入姓名"/>
                              <Select showSearch className={styles.add_select} placeholder="请选择性别" optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                  <Select.Option value="请选择性别">请选择性别</Select.Option>
                                  <Select.Option value="保密">保密</Select.Option>
                                  <Select.Option value="男">男</Select.Option>
                                  <Select.Option value="女">女</Select.Option>
                              </Select>
                              <input type="email" title="邮件" className={styles.add_inputelement} placeholder="请输入邮件"/>
                              <input type="tel" title="电话" className={styles.add_inputelement} placeholder="请输入联系方式"/>
                              <button className={styles.submit}><Icon type="search" theme="outlined" style={{marginRight:10,fontSize:18}}/>提交</button>
                          </div>
                      </div>
                  </div>
              </div>
              <Table dataSource={this.state.dataSource} columns={this.state.columns}/>
          </div>
      </div>
    );
  }
}

export default Manage;
