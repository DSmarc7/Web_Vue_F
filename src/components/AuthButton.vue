<template>
    <div>
      <!-- Display button based on authentication state -->
      <BaseButton v-if="!user" @click="handleSignIn">
        Sign in with Microsoft
      </BaseButton>
      <div v-if="user">
        <p>Logged in as: {{ user.name }}</p>
        <BaseButton @click="handleSignOut">Logout</BaseButton>
      </div>
    </div>
  </template>
  
  <script>
  import { signInAndGetUser, signOutUser } from '@/lib/microsoftGraph.js'; // Assuming you'd create a signOutUser method
  import BaseButton from './BaseButton.vue';
  
  export default {
    name: 'AuthButton',
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
      },
      async handleSignOut() {
        try {
          await signOutUser();
          this.user = null;  // Reset user data on successful logout
        } catch (error) {
          console.error("Error signing out:", error);
        }
      }
    }
  };
  </script>
  