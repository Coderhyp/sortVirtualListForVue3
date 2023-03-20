import { createApp } from "vue";
import "milligram/dist/milligram.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "./less/index.less";

import App from "./App.vue";
import router from "./router";

hljs.registerLanguage("javascript", javascript);
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App);
app.use(router);
app.use(elementPlus);
app.mount("#app");
