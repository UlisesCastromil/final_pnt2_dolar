<template>
  <div class="contenedor">
    <ConversorDolar/>
    <p> 1:c, 2:b, 3:c, 4:a</p>
  </div>
</template>

<script>
import ConversorDolar from './components/ConversorDolar.vue'

export default {
  name: 'App',
  components: {
    ConversorDolar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
