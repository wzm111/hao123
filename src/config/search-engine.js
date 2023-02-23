/**
 * 搜索引擎配置
 */
export const searchEngineConfig = [
  {
    value: 'kaifa',
    label: '开发者工具',
    logo: 'kaifa.svg',
    callback(keyword) {
      return `https://kaifa.baidu.com/searchPage?wd=${keyword}`;
    },
  },
  {
    value: 'bing',
    label: '必应',
    logo: 'bing.png',
    callback(keyword) {
      return `https://cn.bing.com/search?q=${keyword}`;
    },
  },
  {
    value: 'weixin',
    label: '搜狗微信',
    logo: 'weixin.png',
    callback(keyword) {
      return `https://weixin.sogou.com/weixin?query=${keyword}&type=2`;
    },
  },
  {
    value: 'zhihu',
    label: '知乎',
    logo: 'zhihu.png',
    callback(keyword) {
      return `https://www.zhihu.com/search?q=${keyword}&type=content`;
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
