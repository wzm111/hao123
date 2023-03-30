import { getUrl } from './config'
import instance from './request'

// 抽象出来的Axios方法类
class Abstract {
    baseURL = import.meta.env.VITE_APP_BASE_URL;

    headers = {
        ContentType: 'application/jsoncharset=UTF-8'
    }

    apiAxios({ baseURL, headers, method, url, data, params, responseType }) {
        // Object.assign(headers, {
        //     token: storage().get('token') || storage('localstorage').get('token'),
        //     'x-language': storage('localstorage').get('i18n')
        // })
        const _url = url.split('.')
        url = getUrl(_url[0], _url[1])
        return new Promise((resolve, reject) => {
            instance({
                baseURL: baseURL || this.baseURL,
                headers: headers || this.headers,
                method,
                url,
                data,
                params,
                responseType
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.success) {
                        resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data })
                    } else {
                        resolve({ status: false, message: res.data?.errorMessage || (url + '请求失败'), data: res.data?.data, origin: res.data })
                    }
                } else {
                    resolve({ status: false, message: res.data?.errorMessage || (url + '请求失败'), data: null })
                }
            }).catch(err => {
                let message
                switch (err.status) {
                    case 401:
                        message = '登录超时，请重新登录'
                        break
                    default:
                        message = err?.data?.errorMessage || err?.message || (url + '请求失败')
                        break
                }
                console.log({ status: false, message, data: null })
                reject(new Error(message))
            })
        })
    }

    /**
     * GET类型的网络请求
     */
    getReq({ baseURL, headers, url, data, params, responseType }) {
        return this.apiAxios({ baseURL, headers, method: 'GET', url, data, params, responseType });
    }

    /**
     * POST类型的网络请求
     */
    postReq({ baseURL, headers, url, data, params, responseType }) {
        return this.apiAxios({ baseURL, headers, method: 'POST', url, data, params, responseType });
    }

    /**
     * PUT类型的网络请求
     */
    putReq({ baseURL, headers, url, data, params, responseType }) {
        return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType });
    }

    /**
     * DELETE类型的网络请求
     */
    deleteReq({ baseURL, headers, url, data, params, responseType }) {
        return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType });
    }
}

export default Abstract
