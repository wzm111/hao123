// 地址字典 格式为 接口所属范围: { 接口名: 接口地址 } 如 Basic: { getInfo: 'xxx/xxx' }
export const urlDict = {
    // cms
    project: {
        queryList: '/mock/project/queryList', // 查询
        addMessage: '/comment/add', // 添加留言-评论
    }
}

export const getUrl = (biz, UrlName) => {
    try {
        const bizKeys = Object.keys(urlDict)
        if (bizKeys.indexOf(biz) < 0) {
            throw new Error('biz not in Dict')
        }
        let hostname = urlDict[biz][UrlName]
        if (!hostname) {
            throw new Error('url not in Dict')
        }
        // 处理首位为/的地址
        if (hostname.slice(0, 1) === '/') {
            hostname = hostname.slice(1)
        }
        return hostname
    } catch (err) {
        console.error(err)
        return ''
    }
}
