import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Assuming the store is in the 'store' directory

const app = createApp(App);

app.use(store); // Use the Vuex store

app.mount('#app');
