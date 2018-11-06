import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Select, Icon, DatePicker, Radio, Table, Input, Button, Calendar } from 'antd';
import styles from './manage.less';
import moment from 'moment'
import './manage.css';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

// @connect(state => ({
//   isloading: state.error.isloading,
// }))
class Manage extends PureComponent {
  state = {
    // isloading: false,
   month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
   birthday:'',
   size: 'default',
   isShow:false,
   dataSource:[{
      key: '1',
      id:1,
      account:'zhangsan',
      name: '张三',
      birthday:'5.8',
      sex:"保密",
      IDcard: '123@163.com',
      tel: '13888888888',
      themInformation:'早班',
      address:'北京',
      stationInformation:'地址',
      type:'启用'
    },{
      key: '12',
      id:12,
      account:'wangwu',
      address:'北京',
      stationInformation:'地址',
      name: '王五',
      sex:"保密",
      birthday:'5.8',
      IDcard: '123@163.com',
      tel: '13888888888',
      themInformation:'早班',
      type:'启用'
    }],
    columns :[{
      title: '员工编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },{
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
    }, {
      title: '手机号',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: '身份证号码',
      dataIndex: 'IDcard',
      key: 'IDcard',
    },  {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '油站信息',
      dataIndex: 'stationInformation',
      key: 'stationInformation',
    }, {
      title: '班组信息',
      dataIndex: 'themInformation',
      key: 'themInformation',
    },]
  };

  changeBirthday = (value) =>{
    if(value){
      let newArr = value['_d'].toString().split(' ');
      let id=this.state.month.indexOf(newArr[1]);
      if(newArr[1]){
        this.setState({
          birthday:`${newArr[3]}-${id+1}-${newArr[2]}`
        })
      }
    }else{
      this.setState({
        birthday:""
      })
    }
  }

  changeShow=(val)=>{
    this.setState({
      isShow:!this.state.isShow
    })
    if(val){
      console.log('...')
    }
  }

  disabledEndDate = (current) =>{
    if(!current){
      return false
    }else{
      return moment()<current.valueOf()
    }
}

  render() {
    const { dataSource, size, columns, birthday, isShow } = this.state;
    return (
      <div className={styles.user_body}>
        <div className={styles.user_content}>
          <div className={styles.user_content_add}>
            <div className={styles.add_button}>
              <div className={styles.add_input}>
                <div className={styles.example_input}>
                  {/* <Input placeholder="请输入员工编号" title="员工编号" className={styles.ant_input} /> */}
                  <Input placeholder="请输入姓名" title="姓名" className={styles.ant_input} />
                  {/* <Select showSearch className={styles.add_select} placeholder="请选择性别" optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    <Select.Option value="请选择性别">请选择性别</Select.Option>
                    <Select.Option value="保密">保密</Select.Option>
                    <Select.Option value="男">男</Select.Option>
                    <Select.Option value="女">女</Select.Option>
                  </Select> */}
                  {/* <DatePicker onChange={this.changeBirthday} size={size} disabledDate={this.disabledEndDate} placeholder="请输入生日" style={{width:186,marginRight:5}}/> */}
                  <Input placeholder="请输入手机号" title="手机号" className={styles.ant_input} />
                  <Input placeholder="请输入身份证号" title="身份证号" className={styles.ant_input} />
                  {/* <Input placeholder="请输入住址" title="住址" className={styles.ant_input} /> */}
                  {/* <Input placeholder="请输入类型" title="类型" className={styles.ant_input} /> */}
                  {/* <Input placeholder="请输入油站信息" title="油站信息" className={styles.ant_input} /> */}
                  {/* <Input placeholder="请输入班组信息" title="班组信息" className={styles.ant_input} /> */}
                  <Button type="primary" icon="search">查询</Button>
                  <Button icon="plus-circle" className={styles.btns} onClick={this.changeShow}>新增</Button>
                </div>
              </div>
            </div>
          </div>
          <Table dataSource={dataSource} columns={columns} />
          {isShow?<div className={styles.addShek}>
            <div className={styles.newAdd}>
              <span>新增</span>
              <div className={styles.close} onClick={this.changeShow('close')}>&times;</div>
            </div>
          </div>:null}
        </div>
      </div>
    );
  }
}

export default Manage;
