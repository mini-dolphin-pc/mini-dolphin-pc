import { queryNotices } from '@/services/api';

export default {
    // model的空间命名，同时也是全局state上的一个属性，只能是字符串，不支持使用。创建多层命名空间
    namespace: 'global',

    // 状态的初始值
    state: {
        collapsed: false,
        notices: [],
    },

    // 用于处理一步操作，不能直接修改state，由action触发，也可以触发action。它只能是generator函数，并且有action和effects两个参数，第二个参数effects包含put、call和select三个字段，put用于触发action，call用于调用异步处理逻辑，select用于从state中获取数据
    effects: {
        * fetchNotices(_, { call, put }) {
            const data = yield call(queryNotices);
            yield put({
                type: 'saveNotices',
                payload: data,
            });
            yield put({
                type: 'user/changeNotifyCount',
                payload: data.length,
            });
        },
        * clearNotices({ payload }, { put, select }) {
            yield put({
                type: 'saveClearedNotices',
                payload,
            });
            const count = yield select(state => state.global.notices.length);
            yield put({
                type: 'user/changeNotifyCount',
                payload: count,
            });
        },
    },

    // 类似于redux的reduce人，它是一个纯函数，用于处理同步操作，是唯一可以修改state的地方，有antion触发，它有state和action两个参数
    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        saveNotices(state, { payload }) {
            return {
                ...state,
                notices: payload,
            };
        },
        saveClearedNotices(state, { payload }) {
            return {
                ...state,
                notices: state.notices.filter(item => item.type !== payload),
            };
        },
    },

    // subscriptions用于订阅某些数据源，并根据情况dispatch某些action，格式为
    // ({dispatch,history},done)=> unlistenFunction
    subscriptions: {
        setup({ history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        },
    },
};