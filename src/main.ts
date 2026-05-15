import {createApp} from 'vue';
import {createPinia} from 'pinia';
import Antd from 'ant-design-vue';

import App from './App.vue';
import router from './router';

import 'ant-design-vue/dist/reset.css';
import './styles/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd, {
	theme: {
		token: {
			colorPrimary: '#0B66FD',
			colorSuccess: '#24C366',
			colorWarning: '#FFAE00',
			colorError: '#FF4D4F',
		},
	},
});
app.mount('#app');
