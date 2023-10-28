<template>
    <header>
        <nav>
            <div class="logo">
                <h2>Task Manager</h2>
            </div>
            <ul>
                <li>
                <!-- Uncomment or add other navigation items if needed -->
                <!-- <BaseButton margin="10px" color="primary">
                    <i class="fas fa-home"></i> Home
                </BaseButton> -->
                </li>
                <li>
                    <BaseButton @click="signInUser" margin="10px" color="primary" v-if="!isLoggedIn" :disabled="isButtonDisabled">
                        Not logged yet
                    </BaseButton>
                    <BaseButton @click="signOutUser" margin="10px" color="secondary" v-if="isLoggedIn" :disabled="isButtonDisabled">
                        Logout (Logged in as {{ userName }})
                    </BaseButton>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'BaseHeader',
    data() {
        return {
            isButtonDisabled: false
        };
    },
    computed: {
        ...mapGetters('auth', ['user', 'isLoggedIn']),
        userName() {
            return this.user ? this.user.name : '';
        }
    },
    methods: {
        ...mapActions('auth', ['signIn', 'signOut']),
        async signInUser() {
            this.isButtonDisabled = true;
            try {
                await this.signIn();
            } catch (error) {
                console.error("Error signing in:", error);
            } finally {
                this.isButtonDisabled = false;
            }
        },
        signOutUser() {
            this.isButtonDisabled = true;
            try {
                this.signOut();
            } catch (error) {
                console.error("Error signing out:", error);
            } finally {
                this.isButtonDisabled = false;
            }
        }
    }
};
</script>




  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono&family=Montserrat:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');
  nav {
    background-color: #bdeeda;
    color: #FFF; /* changed font color for better readability */
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center; /* vertically center items in nav */
  }
  
  .nav-logo {
    font-size: 1.8em;
    letter-spacing: 3px;
    font-family: 'Montserrat', sans-serif;
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
  