import axios from 'axios';
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
  },
  async fetchTasks({ commit }, userId) {
    try {
        const response = await axios.get(`/tasks/${userId}`);
        commit('UPDATE_TASKS', response.data);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
  },

  async addTask({ commit, state }, task) {
      try {
          const response = await axios.post('/tasks', task);
          commit('UPDATE_TASKS', [...state.user.tasks, response.data]);
      } catch (error) {
          console.error("Error adding task:", error);
      }
  },

  async updateTask({ commit, state }, updatedTask) {
      try {
          await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
          const tasks = state.user.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
          commit('UPDATE_TASKS', tasks);
      } catch (error) {
          console.error("Error updating task:", error);
      }
  },

  async deleteTask({ commit, state }, taskId) {
      try {
          await axios.delete(`/tasks/${taskId}`);
          const tasks = state.user.tasks.filter(task => task.id !== taskId);
          commit('UPDATE_TASKS', tasks);
      } catch (error) {
          console.error("Error deleting task:", error);
      }
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
