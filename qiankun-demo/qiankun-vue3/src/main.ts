import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
declare let window: any;
declare let __webpack_public_path__: any;

// createApp(App).mount('#app');

let instance: any = null;
function render() {
    instance = createApp(App);
    instance.use(router);
    instance.mount('#app');
}
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ // 动态注入路径
}

// 独立运行应用
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export const bootstrap = async (props: any) => { }
export const mount = async (props: any) => {
    render()
}
export const unmount = async (props: any) => {
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
}
