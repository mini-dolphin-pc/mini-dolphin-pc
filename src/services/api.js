import { stringify } from 'qs';
import request from '@/utils/request';
import { URL } from '@/utils/utils';

export async function queryProjectNotice() {
    return request('/api/project/notice');
}

export async function queryActivities() {
    return request('/api/activities');
}

export async function queryLogin(payload) {
    console.log(payload)
    return request('/api/login/stafflogin', {
        method: 'POST',
        body: payload
    });
}

export async function queryRule(params) {
    return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function fakeSubmitForm(params) {
    return request('/api/forms', {
        method: 'POST',
        body: params,
    });
}

export async function fakeChartData() {
    return request('/api/fake_chart_data');
}

export async function queryTags() {
    return request('/api/tags');
}

export async function queryBasicProfile() {
    return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
    return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
    return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request(`/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'delete',
        },
    });
}

export async function addFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request(`/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'post',
        },
    });
}

export async function updateFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request(`/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'update',
        },
    });
}

export async function fakeAccountLogin(params) {
    console.log(params);
    return request(`/api/login/account`, {
        method: 'post',
        body: JSON.stringify(params),
    });
}

export async function fakeRegister(params) {
    return request('/api/register', {
        method: 'POST',
        body: params,
    });
}

export async function queryNotices() {
    return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
    return request(`/api/captcha?mobile=${mobile}`);
}