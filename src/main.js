import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./global.css";

global.jQuery = require("jquery");
const $ = global.jQuery;
window.$ = $;

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUserCircle,
  faBookOpen,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faUserCircle, // => in form => user-circle
  faBookOpen, // => in form => book-open
  faBook // => in form => book
);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
