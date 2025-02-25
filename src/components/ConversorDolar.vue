<template lang="html">
  <section class="src-components-conversor-dolar">
    <div class="container">
      <h2>Conversor pesos a dolares</h2>

      <label for="Pesos">Ingrese el monto en pesos:
        <input type="number" v-model="pesos">
      </label>

      <label for="Dolares">Ingrese la cotizacion del dolar:
        <input type="number" v-model="cotizacion" :readonly="actualizacion">
        <input type="checkbox" v-model="actualizacion" @click="getCotizacion()"> Actualizacion automatica
      </label>

      <p v-if="actualizacion">Ultima cotizacion: {{ ultActualizacion }}</p>

      <h3>Valor en dolares: USD {{ conversionDolar }}</h3>
    </div>
  </section>
</template>

<script lang="js">
import axios from 'axios';

export default {
  name: 'src-components-conversor-dolar',
  data() {
    return {
      pesos: '',
      cotizacion: '',
      actualizacion: false,
      intervalo: null,
      ultActualizacion: ''
    };
  },
  mounted() {

  },
  watch: {
    actualizacion(int) {
      if (int) {
        this.iniciarIntervalo();
      } else {
        this.frenarIntervalo();
      }
    }
  },
  methods: {
    async getCotizacion() {
      try {
        const respuesta = await axios.get('https://api.bluelytics.com.ar/v2/latest');
        this.cotizacion = respuesta.data.blue.value_sell;
        this.ultActualizacion = new Date().toLocaleString();
      } catch (error) {
        console.error('Error al obtener la cotizacion:', error);
      }
    },
    iniciarIntervalo() {
      this.getCotizacion();
      this.intervalo = setInterval(() => {
        this.getCotizacion();
      }, 2000);
    },
    frenarIntervalo() {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  },
  computed: {
      conversionDolar() {
      return (this.pesos && this.cotizacion && !isNaN(this.pesos)) ? (Number(this.pesos) / Number(this.cotizacion)) : '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

label {
  display: block;
  margin: 10px 0;
}

input {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #aaa;
  border-radius: 5px;
}

h3 {
  text-align: center;
  margin-top: 20px;
  color: #2c3e50;
}
</style>