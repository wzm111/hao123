/**
 * 搜索引擎配置
 */
export const searchEngineConfig = [
  {
    value: 'bing',
    label: '必应',
    logo: 'bing.png',
    callback(keyword) {
      return `https://cn.bing.com/search?q=${keyword}`;
    },
  },
  {
    value: 'baidu',
    label: '百度',
    logo: 'baidu.png',
    callback(keyword) {
      return `https://www.baidu.com/s?wd=${keyword}`;
    },
  },

  {
    value: 'sogou',
    label: '搜狗',
    logo: 'sogou.png',
    callback(keyword) {
      return `https://www.sogou.com/web?query=${keyword}`;
    },
  },
  {
    value: 'google',
    label: 'Google',
    logo: 'google.png',
    callback(keyword) {
      return `https://txt.guoqiangti.ga/search?q=${keyword}`;
    },
  },
];
