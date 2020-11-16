import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
   plugins:[createPersistedState()],
   state: {
     cart: []
   },
   mutations: {
       setCart: (state, cart) => state.cart.push(cart),
       clearCart: (state) => state.cart.length = 0
   },
   getters: {
       getCart: (state) =>
       {
           return state.cart
       }
   }
 })
 export default store;