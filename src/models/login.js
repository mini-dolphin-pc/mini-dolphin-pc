import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { queryLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { resolve } from 'url';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        * login({ payload }, { call, put }) {
            const response = yield call(queryLogin, payload);
            // console.log(111)
            console.log(response)
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // // Login successfully

            if (response.code == 10000) {
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.startsWith('/#')) {
                            redirect = redirect.substr(2);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            }
        },

        * getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload);
        },

        * logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                    currentAuthority: 'guest',
                },
            });
            reloadAuthorized();
            yield put(
                // 跳转路由
                routerRedux.push({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                })
            );
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};