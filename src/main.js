import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Assuming the store is in the 'store' directory
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';




const app = createApp(App);

app.use(store); // Use the Vuex store

app.mount('#app');
