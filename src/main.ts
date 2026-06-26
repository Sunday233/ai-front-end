import "ant-design-vue/dist/reset.css";
import "@/styles/index.scss";

import App from "@/App.vue";
import router from "@/router";
import { setupApiMock } from "@/services/mock";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import { createApp } from "vue";

setupApiMock();

createApp(App).use(createPinia()).use(router).use(Antd).mount("#app");
