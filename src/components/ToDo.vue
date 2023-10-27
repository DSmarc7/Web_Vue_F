<template>
    <div id="app">
      <h1>Daily To-Do list manager</h1>
      <section class="todo-wrapper">
        <h2 class="todo-title">{{ today.day }}<br>{{ today.date }}</h2>
        <form @keydown.enter.prevent="">
          <input type="text" class="input-todo" v-bind:class="{ active: new_todo }" placeholder="Take the garbage out" v-model="new_todo" v-on:keyup.enter="addItem">
          <div class="btn btn-add" v-bind:class="{ active: new_todo }"  @click="addItem">+</div>
        </form>
  
        <div v-if="pending.length > 0">
          <p class="status busy">You have {{ pending.length }} pending item<span v-if="pending.length>1">s</span></p>
          <transition-group name="todo-item" tag="ul" class="todo-list">
            <li v-for="item in pending" v-bind:key="item.title">
              <input class="todo-checkbox" v-bind:id="'item_' + item.id" v-model="item.done" type="checkbox">
              <label v-bind:for="'item_' + item.id"></label>
              <span class="todo-text">{{ item.title }}</span>
              <span class="delete" @click="deleteItem(item)"></span>
            </li>
          </transition-group>  
        </div> 
  
        <transition name="slide-fade">
          <p class="status free" v-if="!pending.length"><img src="images/beer_celebration.svg" alt="celebration">Time to chill!  You have no todos.</p> 
        </transition> 
  
        <div v-if="completed.length > 0 && showComplete">
          <p class="status">Completed tasks: {{ completedPercentage }}</p>
          <transition-group name="todo-item" tag="ul" class="todo-list archived">
            <li v-for="item in completed" v-bind:key="item.title">
              <input class="todo-checkbox" v-bind:id="'item_' + item.id" v-model="item.done" type="checkbox">
              <label v-bind:for="'item_' + item.id"></label>
              <span class="todo-text">{{ item.title }}</span>
              <span class="delete" @click="deleteItem(item)"></span>
            </li>
          </transition-group>  
        </div>
        
        <div class="control-buttons">
          <div class="btn btn-secondary" v-if="completed.length > 0" @click="toggleShowComplete">
            <span v-if="!showComplete">Show</span><span v-else>Hide</span> Complete
          </div>
          <div class="btn btn-secondary" v-if="todoList.length > 0" @click="clearAll">Clear All</div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ToDo',
    data() {
      return {
        todoList: [
          {"id":0,"title":"Go to codepen and get inspired","done":false},
          {"id":1,"title":"Pick a project","done":false},
          {"id":4,"title":"Create a new pen","done":true}
        ],
        new_todo: '',
        showComplete: false,
      };
    },
    mounted() {
      this.getTodos();
    },
    watch: {
      todoList: {
        handler: function(updatedList) {
          localStorage.setItem('todo_list', JSON.stringify(updatedList));
        },
        deep: true
      }
    },
    computed: {
  pending() {
    return this.todoList.filter(item => !item.done);
  },
  completed() {
    return this.todoList.filter(item => item.done);
  },
  completedPercentage() {
    const total = this.todoList.length;
    const completedCount = this.completed.length;
    return `${Math.round((completedCount / total) * 100)}%`;
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
  addItem() {
    if (this.new_todo.trim()) {
      const newId = this.todoList.length ? Math.max(...this.todoList.map(item => item.id)) + 1 : 0;
      this.todoList.push({ id: newId, title: this.new_todo, done: false });
      this.new_todo = '';
    }
  },
  deleteItem(itemToDelete) {
    this.todoList = this.todoList.filter(item => item.id !== itemToDelete.id);
  },
  toggleShowComplete() {
    this.showComplete = !this.showComplete;
  },
  clearAll() {
    this.todoList = [];
  },
  getTodos() {
    const savedTodos = localStorage.getItem('todo_list');
    if (savedTodos) {
      this.todoList = JSON.parse(savedTodos);
    }
  }
},
  };
  </script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(#fc6c48 0%, #ef5081 100%);
  padding: 50px 20px;
  margin: 0;
}

h1 {
  color: #fff;
  text-align: center;
}

.todo-wrapper {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.05);
  background-color: #f4f7fc;
}

.todo-title {
  font-size: 1.2em;
  color: #f65c65;
}

input[type='text'] {
  border: 1px solid #ddd;
  width: 80%;
  transition: border ease-in 0.25s;
  /* placeholder: { color: rgba(0,0,0,0.3); } */
}

input:focus {
  border-color: #a3b1ff;
}

.btn-add {
  background: #ddd;
  color: #fefefe;
  border-color: #ddd;
  float: right;
}

.btn-add.active {
  background: #6664ff;
  border-color: #6664ff;
}

ul.todo-list {
  padding: 0;
}

ul.todo-list li {
  list-style: none;
  margin: 10px 0;
  background: #e0e8f5;
  padding: 12px 48px 12px 38px; 
}

.todo-text {
  display: inline-block;
}

.todo-checkbox + label {
  position: absolute;
  left: 10px;
  width: 22px;
  height: 22px;
  border: 1px solid #cfdcec;
}

.todo-checkbox:checked + label:after {
  content: '';
  height: 3px;
  width: 6px;
  border: solid #fc6c48;
  border-width: 0 0 2px 2px;
  transform: rotate(-45deg) translate(-50%, -50%);
}

.todo-checkbox:checked ~ .todo-text {
  color: #888;
  text-decoration: line-through;
}

</style>