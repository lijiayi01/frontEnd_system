import { createApp } from 'vue';
import { Button, Slider, Toast } from 'vant';
import '@/assets/scss/index.scss';
import 'vant/es/toast/style';
import App from './App.vue';
import store from './store/index';
import router from './router/index';
const app = createApp(App);

const s=2
console.log(import.meta.env, '....');
app.use(store);
app.use(router);
app.use(Button, Slider, Toast);
app.mount('#app');
