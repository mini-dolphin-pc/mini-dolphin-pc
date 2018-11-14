/**
 * http请求
 */
const SERVER_URL = 'http://192.168.3.46:80';
var HttpUtil = {};

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params {}
 * @param headers
 * @returns {Promise}
 */
HttpUtil.get = function(url, params) {
    url = SERVER_URL + url;
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject({ status: response.status })
            }
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject({ status: -1 });
        })
    })
}


/**
 * 基于 fetch 封装的 POST请求  FormData 表单数据
 * @param url
 * @param formData  
 * @param headers
 * @returns {Promise}
 */
HttpUtil.post = function(url, formData) {
    url = SERVER_URL + url;
    console.log(formData);
    debugger
    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).then((response) => {
            console.log(response)
            if (response.status == 200) {
                console.log(response.json())
                return response.json();
            } else {
                reject({ status: response.status })
            }
        }).then((result) => {
            console.log(result)
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject({ status: -1 });
        })
    })
}


export default HttpUtil;