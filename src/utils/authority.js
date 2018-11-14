// 使用localStorage来存储在实际项目中可能从服务器发送的权限信息.
export function getAuthority(str) {
    // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
    console.log(localStorage.getItem('antd-pro-authority'), str);
    const authorityString =
        typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
    // authorityString could be admin, "admin", ["admin"]
    let authority;
    try {
        authority = JSON.parse(authorityString);
    } catch (e) {
        authority = authorityString;
    }
    if (typeof authority === 'string') {
        return [authority];
    }
    return authority || ['admin'];
}

export function setAuthority(authority) {
    debugger
    const proAuthority = typeof authority === 'string' ? [authority] : authority;
    return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}