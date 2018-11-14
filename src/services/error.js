import request from '@/utils/request';

export default async function queryError(code) {
    console.log(code)
    return request(`/api/${code}`);
}