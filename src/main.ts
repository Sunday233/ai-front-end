import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import { router } from './router';
import { setupApiMock } from './services/mock';
import './styles/index.scss';

setupApiMock();

createApp(App).use(createPinia()).use(router).use(Antd).mount('#app');
