<template>
    <button
      class="base-button"
      :style="{ margin: margin }"
      :disabled="disabled"
      @click.prevent="handleClick"
    >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      disabled: Boolean,
      margin: String,
    },
    methods: {
      handleClick(event) {
        if (!this.disabled) {
          this.$emit('click', event); // Emit the event along with the event object.
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .base-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #42b883; /* Vue.js logo green color */
    color: white;
    transition: background-color 0.3s, transform 0.1s;
  }
  
  .base-button:hover {
    background-color: #34956e; /* Darker green for hover */
    transform: scale(1.05);
  }
  
  .base-button:disabled {
    background-color: #a2d3c2; /* Lighter green for disabled */
    cursor: not-allowed;
  }
  </style>
  