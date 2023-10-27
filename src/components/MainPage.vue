<template>
    <div class="main-page">
      Here is my web project
      <TodoVue />
    </div>
  </template>
  
  <script>
  import TodoVue from './ToDo.vue';  // Adjust the path accordingly
  
  export default {
    name: 'MainPage',
    components: {
      TodoVue,
    }
  };
  </script>
  
  <style scoped>
  .main-page {
    text-align: center;
    padding: 20px;
    font-size: 1.5rem;
    color: #555;
  }
  </style>
  