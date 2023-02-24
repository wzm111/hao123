import {
    createApp
} from 'vue';
import App from './App.vue';
// import lazyPlugin from 'vue3-lazy';
import 'lazysizes';
import 'reset.css';
import './style/main.less';
import {
    createPinia
} from 'pinia';
import LocalStore from 'localstoredb';

const app = createApp(App);

app.use(createPinia());

let options = {
    storeType: ['storage'], // 储存类型
    dbName: 'localStore', // 数据库名
    expire: 0, // 过期时间，0 不过期，单位ms
    storageType: 'local', // storage下有效，默认local, 可选值：'local' | 'session'
    size: 5242880 // webSql下数据库大小设置,单位kb
};
const localStore = LocalStore(options);

window.$localStore = localStore;
// app.use(lazyPlugin, {
//   loading: '/assets/images/default.png', // 图片加载时默认图片
//   error: '/assets/images/error.png', // 图片加载失败时默认图片
// });

app.config.globalProperties.$static_url =
    import.meta.env.VITE_APP_STATIC_URL;

app.mount('#app');