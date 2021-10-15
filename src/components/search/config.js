/**
 * 搜索引擎配置
 */
export const searchEngineConfig = [
  {
    value: 'baidu',
    label: '百度',
    callback(keyword) {
      return `https://www.baidu.com/s?wd=${keyword}`;
    },
  },

  {
    value: 'sogou',
    label: '搜狗',
    callback(keyword) {
      return `https://www.sogou.com/web?query=${keyword}`;
    },
  },

  {
    value: 'bing',
    label: '必应',
    callback(keyword) {
      return `https://cn.bing.com/search?q=${keyword}`;
    },
  },

  {
    value: 'google',
    label: 'Google',
    callback(keyword) {
      return `https://txt.guoqiangti.ga/search?q=${keyword}`;
    },
  },
];
