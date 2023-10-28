import { signInAndGetUser, signOutUser } from '@/lib/microsoftGraph.js';

const state = {
  isLoggedIn: false,
  user: null
}

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isLoggedIn = !!user;
  },
  UPDATE_TASKS(state, tasks) {
    if (state.user) {
        state.user.tasks = tasks;
    }
  }
}

const actions = {
  async signIn({ commit }) {
    try {
      const user = await signInAndGetUser();
      commit('SET_USER', user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  },
  signOut({ commit }) {
    try {
      signOutUser();
      commit('SET_USER', null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
  updateTasks({ commit }, tasks) {
    commit('UPDATE_TASKS', tasks);
    
    // Optionally, if you want to save these tasks to a backend, you can do it here.
  }
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
