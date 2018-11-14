import { fakeChartData } from '@/services/api';

function detail() {
    window.location.href = '/oils/mini-oils';
}

export default {
    namespace: 'echart',

    state: {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
        loading: false,
        data: [{
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
        columns: [{
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
            },
        ],
        option: {
            title: {
                text: '销售额',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['油品销售'],
            },
            grid: {
                textAline: 'center',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    '8:00',
                    '9:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                ],
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [1200, 1320, 1010, 1340, 900, 2300, 5210, 7000, 5635, 1523],
            }, ],
        },
        options: {
            title: {
                text: '油品销量',
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                data: [92, 95, 98, 101, 0],
                axisTick: {
                    alignWithLabel: true,
                },
            }, ],
            yAxis: [{
                type: 'value',
            }, ],
            series: [{
                name: '油品销量',
                type: 'bar',
                barWidth: '60%',
                data: [23344, 4533, 453, 543, 643],
            }, ],
        },
    },

    effects: {
        * fetch(_, { call, put }) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        * fetchSalesData(_, { call, put }) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: {
                    salesData: response.salesData,
                },
            });
        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        clear() {
            return {
                visitData: [],
                visitData2: [],
                salesData: [],
                searchData: [],
                offlineData: [],
                offlineChartData: [],
                salesTypeData: [],
                salesTypeDataOnline: [],
                salesTypeDataOffline: [],
                radarData: [],
            };
        },
    },
};