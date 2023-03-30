import axios from 'axios';
// 取消重复请求
// let requestCount = 0
// const pending = []
// const CancelToken = axios.CancelToken
// 创建axios实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 3600 * 60 * 1000,
    responseType: 'json'
})

// 移除重复请求
// const removePending = (config) => {
//     for (const key in pending) {
//         // 获得当前位置用于后面的删除
//         const item = +key
//         const list = pending[key]
//         // 当前请求在数组中存在时执行函数体
//         if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
//             // 执行取消操作
//             if (list.url !== 'oms/admin/v1/azure/getAzureAccountSASToken') {
//                 list.cancel('操作太频繁，请稍后再试')
//             }
//             // 从数组中移除记录
//             pending.splice(item, 1)
//         }
//     }
// }

// 请求拦截器
instance.interceptors.request.use(
    request => {
        // requestCount++
        // removePending(request)
        // request.cancelToken = new CancelToken((c) => {
        //     pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c })
        // })
        return request
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // requestCount--
        // // if (!requestCount) {
        // //     loadingInstance.close()
        // // }

        // removePending(response.config)

        const errorCode = response?.data?.errorCode
        switch (errorCode) {
            // case '1020007':
            //     store.dispatch('basic/toggleModifyPass', { status: true, type: 'required' })
            //     break
            default:
                break
        }

        return response
    },
    error => {
        // requestCount--
        // if (!requestCount) {
        //     loadingInstance.close()
        // }

        const response = error.response
        // 根据返回的code值来做不同的处理(和后端约定)
        switch (response?.status) {
            // case 401:
            //     // token失效
            //     storage().remove('token')
            //     storage('localstorage').remove('token')
            //     storage('localstorage').remove('vuex')
            //     window.location.href = '/login'
            //     break
            // case 403:
            //     // 没有权限
            //     store.dispatch('basic/activeErrorPage', { status: true, type: '403' })
            //     break
            // case 404:
            //     // 接口地址错误
            //     store.dispatch('basic/activeErrorPage', { status: true, type: '404' })
            //     break
            // case 500:
            //     // 服务端错误
            //     store.dispatch('basic/activeErrorPage', { status: true, type: '500' })
            //     break
            // case 503:
            //     // 服务端错误
            //     store.dispatch('basic/activeErrorPage', { status: true, type: '503' })
            //     break
            default:
                break
        }

        // 超时重新请求
        const config = error.config
        // 全局的请求次数,请求的间隙
        const [RETRY_COUNT, RETRY_DELAY] = [0, 1000]

        if (config && RETRY_COUNT) {
            // 设置用于跟踪重试计数的变量
            config.__retryCount = config.__retryCount || 0
            // 检查是否已经把重试的总数用完
            if (config.__retryCount >= RETRY_COUNT) {
                return Promise.reject(response || { message: error.message })
            }
            // 增加重试计数
            config.__retryCount++
            // 创造新的Promise来处理指数后退
            const backoff = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(null)
                }, RETRY_DELAY || 1)
            })
            // instance重试请求的Promise
            return backoff.then(() => {
                return instance(config)
            })
        }

        return Promise.reject(response || { message: error.message })
    }
)

export default instance
