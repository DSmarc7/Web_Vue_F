<template>
    <footer class="full-width-footer">
      <div class="legal-credits">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        <!-- Add your legal credits and information here -->
      </div>
    </footer>
</template>

<script>
export default {
    name: 'BaseFooter'
}
</script>

<style scoped>
.full-width-footer {
  background-color: #333; 
  color: #fff; 
  padding: 10px;
  text-align: center;
  width: 100%; /* This will make the footer take up 100% of the viewport width */
  box-sizing: border-box; /* This ensures that padding is included in the width */
}

.legal-credits {
  font-size: 14px;
}
</style>
