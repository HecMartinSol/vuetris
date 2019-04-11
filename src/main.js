import Vue from 'vue'
import App from './App.vue'

// Para instalar el modulo para hacer peticiones HTTP
// npm install vue-resource --save
import VueResource from 'vue-resource'
Vue.use(VueResource);

// Para instalar el router de Vue (no viene por defecto)
// npm install vue-router --save
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import {rutas} from './rutas.js';
const myRouter = new VueRouter({
	routes 	: rutas,
	mode 	: 'history' // quita el # de la ruta
});

export var bus = new Vue();

new Vue({
  el: '#app',
  router : myRouter,
  render: h => h(App)
})
