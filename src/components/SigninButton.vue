<template>
    <div>
      <BaseButton @click="handleSignIn" v-if="!user">
        Sign in with Microsoft
      </BaseButton>
      <div v-if="user">
        <p>Logged in as: {{ user.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { signInAndGetUser } from '@/lib/microsoftGraph.js';
  import BaseButton from './BaseButton.vue';
  
  export default {
    name: 'SigninButton',
    components: {
      BaseButton
    },
    data() {
      return {
        user: null
      };
    },
    methods: {
      async handleSignIn() {
        try {
          this.user = await signInAndGetUser();
        } catch (error) {
          console.error("Error signing in:", error);
        }
      }
    }
  };
  </script>
  