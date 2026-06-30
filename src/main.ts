import "ant-design-vue/dist/reset.css";
import "@/styles/index.scss";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupApiMock } from "./services/mock";

setupApiMock();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
