<template>
  <div id="app">
      <h1>Daily To-Do List Manager</h1>
      <section class="todo-wrapper">

          <!-- Heading and Add New Task -->
          <header>
              <h2 class="todo-title">{{ today.day }}<br>{{ today.date }}</h2>
              <form @submit.prevent="addItem">
                  <input 
                      type="text"
                      class="input-todo"
                      :class="{ active: new_todo }"
                      placeholder="Enter a new task..."
                      v-model="new_todo"
                      @keyup.enter="addItem"
                  />
                  <button type="button" class="btn btn-add" :class="{ active: new_todo }" @click="addItem">+</button>
              </form>
          </header>

          <!-- Pending Items -->
          <div v-if="pending.length">
              <p class="status busy">You have {{ pending.length }} pending item<span v-if="pending.length > 1">s</span></p>
              <ul class="todo-list">
                  <li v-for="item in pending" :key="item.title">
                      <input 
                          class="todo-checkbox"
                          :id="'item_' + item.id"
                          v-model="item.done"
                          type="checkbox"
                          @change="toggleTaskCompletion(item)"
                      />
                      <label :for="'item_' + item.id"></label>
                      <span class="todo-text">{{ item.title }}</span>
                      <button class="delete" @click="deleteItem(item)"></button>
                  </li>
              </ul>
          </div>
          
          <p class="status free" v-if="!pending.length">
              <img :src="beerCelebrationImage" alt="celebration" />Time to chill! You have nothing to do.
          </p>

          <!-- Completed Items -->
          <div v-if="completed.length && showComplete">
              <p class="status">Completed tasks: {{ completedPercentage }}</p>
              <ul class="todo-list completed-list">
                  <li v-for="item in completed" :key="item.title">
                      <input 
                          class="todo-checkbox"
                          :id="'item_' + item.id"
                          v-model="item.done"
                          type="checkbox"
                      />
                      <label :for="'item_' + item.id"></label>
                      <span class="todo-text">{{ item.title }}</span>
                      <button class="delete" @click="deleteItem(item)"></button>
                  </li>
              </ul>
          </div>

          <!-- Control Buttons -->
          <footer class="control-buttons">
              <button 
                  class="btn btn-secondary"
                  v-if="completed.length"
                  @click="toggleShowComplete"
              >
                  <span v-if="!showComplete">Show</span><span v-else>Hide</span> Completed
              </button>
              <button 
                  class="btn btn-danger"
                  v-if="todoList.length"
                  @click="clearAll"
              >
                  Clear All
              </button>
          </footer>
      </section>
  </div>
</template>


  
<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'ToDo',
    data() {
        return {
            new_todo: '',
            showComplete: false,
            beerCelebrationImage: require('@/assets/beer_celebration.svg'),
        };
    },
    async created() {
        try {
            const response = await axios.get(`/tasks/${this.user.id}`);
            this.updateTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    },
    computed: {
        ...mapGetters('auth', ['user']),
        todoList() {
            return this.user && this.user.tasks ? this.user.tasks : [];
        },
        pending() {
            return this.todoList.filter(task => !task.done);
        },
        completed() {
            return this.todoList.filter(item => item.done);
        },
        completedPercentage() {
            const total = this.todoList.length;
            const completedCount = this.completed.length;
            return total ? `${Math.round((completedCount / total) * 100)}%` : '0%';
        },
        today() {
            const dateObj = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return {
                day: days[dateObj.getDay()],
                date: dateObj.toDateString()
            };
        }
    },
    methods: {
        ...mapActions('auth', ['updateTasks']),
        async addItem() {
            if (this.new_todo.trim()) {
                const newId = Date.now();  // Use the current timestamp as an ID
                const newTask = { id: newId, title: this.new_todo, done: false };
                try {
                    await axios.post('/tasks', newTask);
                    const updatedTasks = [...this.todoList, newTask];
                    this.updateTasks(updatedTasks);
                    this.new_todo = '';
                } catch (error) {
                    console.error("Error adding task:", error);
                }
            }
        },
        async deleteItem(itemToDelete) {
            try {
                await axios.delete(`/tasks/${itemToDelete.id}`);
                const updatedTasks = this.todoList.filter(item => item.id !== itemToDelete.id);
                this.updateTasks(updatedTasks);
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },
        async toggleTaskStatus(task) {
            try {
                task.done = !task.done;
                await axios.put(`/tasks/${task.id}`, task);
                const taskIndex = this.todoList.findIndex(item => item.id === task.id);
                if (taskIndex > -1) {
                    this.todoList[taskIndex] = task;
                    this.updateTasks([...this.todoList]);
                }
            } catch (error) {
                console.error("Error updating task:", error);
            }
        },
        toggleShowComplete() {
            this.showComplete = !this.showComplete;
        },
        async clearAll() {
            try {
                for (let task of this.todoList) {
                    await axios.delete(`/tasks/${task.id}`);
                }
                this.updateTasks([]);
            } catch (error) {
                console.error("Error clearing tasks:", error);
            }
        },
    }
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chivo+Mono&family=Montserrat:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');

h1{
  color: #42b883;
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.todo-wrapper{
  width: 600px;
  max-width: 100%;
  min-height: 500px;
  margin: 20px auto 50px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 40px 20px;
  -webkit-box-shadow: 0 0 15px 0 rgba(0,0,0,0.05);
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.05);
  background-color: #f4f7fc;
  overflow: hidden;
  position: relative;
}

.todo-title{
  font-size: 1.2em;
  color: #f65c65;
  font-weight: normal;
}

form{
  overflow: overlay;
}

form label{
  display: block;
  text-align: center;
  font-size: 1.2em;
}

.btn, input {
  line-height: 2em;
  border-radius: 3px;
  border: 0;
  display: inline-block;
  margin: 15px 0;
  padding: 0.2em 1em;
  font-size: 1em;
}

input[type='text'] {
  border: 1px solid #ddd; 
  min-width: 80%;
  transition: all ease-in 0.25s;
}

input:focus{
  outline: none;
  border: 1px solid #a3b1ff;
}

input::placeholder{
  color: rgba(0,0,0,0.3);
  font-style: italic;
}

/* disable ios zoom on focus */
@media screen and (-webkit-min-device-pixel-ratio:0) { 
  select,
  textarea,
  input {
    font-size: 16px;
  }
}

@media screen and (-webkit-min-device-pixel-ratio:0) { 
  select:focus,
  textarea:focus,
  input:focus {
    font-size: 16px;
  }
}


.btn{
  text-align: center;
  font-weight: bold; 
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
}

.btn-add {
  background: #ddd;
  color: #fefefe;
  border-color: #ddd;
  min-width: 5%;
  pointer-events: none;
  transition: all ease-in 0.25s;
  font-size: 2.2em;
  line-height: 0.155em;
  padding: 0.3em 0.3em;
  float: right;
}

.btn-add.active{
  background: #6664ff;
  border-color: #6664ff;
  pointer-events: visible;
}

.btn-add.active:hover{
  background: #4442f6;
  border-color: #4442f6;
}

.btn-add:active{
  transform: scale(0.95);
}

.control-buttons{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
}
.btn-secondary{
  display: inline-block;
  position: relative;
  border: 0;
  padding: 0;
  margin: 0 10px;
}

.btn-secondary:after{
  position: absolute;
  content: '';
  width: 0;
  height: 3px;
  background-color: #f4586e;
  bottom: 0px;
  left: 0;
  transition: all ease-in 0.25s;
}

.btn-secondary:hover:after{
  width: 100%;
}

ul.todo-list{
  padding: 0;
  margin-bottom: 30px;
}

ul.todo-list li{
  position: relative;
  list-style-type: none;
  display: block;
  margin: 10px 0;
  background: #e0e8f5;
  border-radius: 3px;
  padding-left: 38px; /* custom checkbox width + 16 */
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 49px; /* delete button + 5 */ 
  overflow: hidden;
}

ul.todo-list.archived li{
  background: #fff;
}

.todo-text{
  position: relative;
  display: inline-block;
  padding: 0 0.5em;
}


ul.todo-list li .delete{
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0;
  width: 0;
  background-color: #f56468;
  color: #fff;
  transition: all ease-in 0.25s;
}

ul.todo-list li .delete:after{
  position: absolute;
  content: '';
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  background-image: url(../assets/trash.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: translate(-50%, -50%) scale(0.5);
  transition: all ease-in 0.25s;
}

ul.todo-list li:hover .delete{
  width: 44px;
  opacity: 1;
}

ul.todo-list li:hover .delete:after{
  transform: translate(-50%, -50%) scale(1);
}
  
.todo-checkbox{
  position: absolute; 
  opacity: 0;
  display: none;
}

.todo-checkbox + label {
  position: absolute;
  cursor: pointer;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border-radius: 2px;
  border: 1px solid #cfdcec;
  background-color: #fff;
}

.todo-checkbox:checked + label:after{
  position: absolute;
  content: '';
  top: 30%;
  left: 50%;
  height: 3px;
  width: 6px;
  border: solid #fc6c48;
  border-width: 0 0 2px 2px;
  transform-origin: center center;
  transform: rotate(-45deg) translate(-50%, -50%);
}

.todo-checkbox:checked + label:after{
  display: block;
}

.todo-checkbox:checked ~ .todo-text{
  color: #888;
  text-decoration: line-through
}

.status.free{
  font-weight: bold;
  text-align: center;
  margin: 40px 0;
}
.status.free img{
  display: block;
  width: 50px;
  margin: 10px auto;
}

.todo-item-enter-active, .todo-item-leave-active {
  transition: opacity ease 0.25s, transform ease-in-out 0.3s;
  transform-origin: left center;
}

/* .todo-item-leave-active below version 2.1.8 */
.todo-item-enter, .todo-item-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

 
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
/* .slide-fade-leave-active below version 2.1.8 */
.slide-fade-enter, .slide-fade-leave-to {  
  transform: scale(1.1);
  opacity: 0;
}

</style>
