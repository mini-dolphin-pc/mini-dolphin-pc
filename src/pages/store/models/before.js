import { queryActivities } from '@/services/api';
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let timer = value => {
  if (value) {
    let str = '';
    let newArr = value.toString().split(' ');
    let id = month.indexOf(newArr[1]);
    if (newArr[1]) {
      str = `${newArr[3]}-${id + 1}-${newArr[2]} ${newArr[4]}`;
    }
    return str;
  }
};

export default {
  namespace: 'beforeform',

  state: {
    list: [
      {
        id: 1,
        name: '订单数',
        num: 34,
      },
      {
        id: 1,
        name: '订单数',
        num: 34,
      },
      {
        id: 1,
        name: '订单数',
        num: 34,
      },
      {
        id: 1,
        name: '订单数',
        num: 34,
      },
    ],
    time: timer(new Date()),
    type: [
      {
        id: 1,
        name: '门店',
        select: ['东城加油站', '西城加油站'],
      },
      {
        id: 2,
        name: '班次',
        select: ['早', '晚'],
      },
      {
        id: 3,
        name: '支付方式',
        select: ['微信', '支付宝', '银联'],
      },
    ],
    shopClassify: [
      {
        key: '1',
        num: '5641564156341',
        time: '2018/2/2 9:00',
        tel: '888888888888',
        payType: '支付宝',
        should: 200,
        money: 198,
      },
      {
        key: '2',
        num: '5641564156341',
        time: '2018/2/2 9:00',
        tel: '888888888888',
        payType: '支付宝',
        should: 200,
        money: 198,
      },
      {
        key: '3',
        num: '5641564156341',
        time: '2018/2/2 9:00',
        tel: '888888888888',
        payType: '支付宝',
        should: 200,
        money: 198,
      },
    ],
    statistics: [
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
        title: '实付金额',
        key: 'money',
        dataIndex: 'money',
      },
    ],
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
        detail: '查看',
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
        detail: '查看',
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
        detail: '查看',
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
        title: '详情',
        key: 'detail',
        dataIndex: 'detail',
      },
    ],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *changeTime(_, { put }) {
      console.log(timer(new Date()));
      yield put({
        type: 'changetime',
        payload: timer(new Date()),
      });
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changetime(state, action) {
      console.log(action);
      return {
        ...state,
        time: action.payload,
      };
    },
  },
};
