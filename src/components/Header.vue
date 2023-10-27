<template>
    <header>
        <nav>
            <div class="logo">
                <h2>Todo List</h2>
            </div>
            <ul>
                <li>
                <BaseButton margin="10px" color="primary">
                    <i class="fas fa-home"></i> Home
                </BaseButton>
                </li>
                <li>
                <BaseButton @click="signInUser" margin="10px" color="primary">
                    <!-- Display 'Logged in as [MicrosoftUsername]' if logged in, else display 'Not logged yet' -->
                    {{ isLoggedIn ? 'Logged in as ' + user.name : 'Not logged yet' }}
                </BaseButton>
                </li>
            </ul>
        </nav>
    </header>
</template>

<!-- The rest of the script and style remain the same -->

  
  <script>
  import BaseButton from './BaseButton.vue';
  import { signInAndGetUser } from '@/lib/microsoftGraph.js';
  
  export default {
    name: 'BaseHeader',
    components: {
      BaseButton,
    },
    data() {
      return {
        isLoggedIn: false,
        user: null,
      };
    },
    methods: {
      async signInUser() {
        try {
          this.user = await signInAndGetUser();
          this.isLoggedIn = true;
        } catch (error) {
          console.error("Error signing in:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #bdeeda;
    color: #333; /* changed font color for better readability */
    padding: 10px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center; /* vertically center items in nav */
  }
  
  .nav-logo {
    font-size: 1.8em;
    letter-spacing: 3px;
    font-weight: bold;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin: 0 10px;
  }
  
  </style>
  