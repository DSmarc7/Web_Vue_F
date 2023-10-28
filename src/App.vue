<template>
  <base-header/>
  <main-page/>
  <base-footer/>
</template>



<script>
import MainPage from './components/MainPage.vue'
import BaseFooter from './components/Footer.vue'
import BaseHeader from './components/Header.vue'


export default {
  components: {
  
    'main-page': MainPage,
    'base-footer': BaseFooter,
    'base-header': BaseHeader,
    
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Chivo+Mono&family=Montserrat:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
</style>
