import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import './style.css';
import App from './App.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import ElementPlus, { ElTooltip } from 'element-plus';

if (ElTooltip && ElTooltip.props && ElTooltip.props.effect) {
  ElTooltip.props.effect.default = 'light';
}

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia);
app.use(router);

app.mount('#app');
