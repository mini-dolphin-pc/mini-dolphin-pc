import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';


export default {
    namespace: 'home',

    state: {
        sale: [{
            title: "总销售额",
            num: 52121
        }, {
            title: "油品",
            num: 52121
        }, {
            title: "便利店",
            num: 52121
        }, {
            title: "优惠金额",
            num: 52121
        }]
    },

    effects: {
        * submitStepForm({ payload }, { call, put }) {
            yield call(fakeSubmitForm, payload);
            yield put({
                type: 'saveStepFormData',
                payload,
            });
            yield put(routerRedux.push('/form/step-form/result'));
        },
        * submitAdvancedForm({ payload }, { call }) {
            yield call(fakeSubmitForm, payload);
            message.success('提交成功');
        },
    },

    reducers: {
        saveStepFormData(state, { payload }) {
            return {
                ...state,
                step: {
                    ...state.step,
                    ...payload,
                },
            };
        },
    },
};