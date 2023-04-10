/**
 * 基础 API 集合类
 * 集成Abstract
 */
import Abstract from '../abstract';

class Basic extends Abstract {
    // ============================= cms =============================================
    /**
      * 查询页
      */
    async QueryList(params) {
        const res = await this.getReq({ url: 'project.queryList', params });
        if (res.data?.length > 0) {
            return res.data;
        }
        return [];
    }

    /**
     * 查询页
     */
    async addMessage(params) {
        const res = await this.getReq({ url: 'project.addMessage', params });
        if (res.origin?.msg === 'success') {
            return res.data;
        }
        return false;
    }
}

// 单列模式返回对象
let instance;
export default (() => {
    if (instance) return instance;
    instance = new Basic();
    return instance;
})();
