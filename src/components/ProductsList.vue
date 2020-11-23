<template>
    <div class="products">
        <form class="searchbar">
            <input placeholder="Пошук" v-model="search">
            <input type="submit"  class="btn">
            <button class="btn">
                <router-link v-bind:to= "'/cart'">
                    Cart
                </router-link>
            </button> 
        </form>
        <div class="product" v-for="(item) in filteredItems" v-bind:key="item._id">
            <div>
                <h4 class="product-title">
                    <router-link v-bind:to="'/product/' + item._id">
                        {{ item.item }}
                    </router-link>
                </h4>
                <label>{{item.price}}</label>
                <button v-on:click="addItem(item._id)" class="btn">Add to cart</button>   
            </div>
        </div>
    </div>
</template>
<script>
    //import products from '../data/products.js'
    import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

    export default {
        data: function () {
            return {
                items: [],
                search: '',
                searchResult: []
            };
        },
        mounted: function(){
            /*alert(products)
            this.items = products;*/
            Vue.axios.get("http://localhost:3000/get").then((response) => {
                console.log(response.data)  
                this.items = response.data
            })
        },
        methods:{
            addItem: function(index){
                for(let i = 0; i < this.items.length; i++){
                    if(this.items[i]._id == index){
                        this.$store.commit('setCart', this.items[i])
                    }
                }
            },
        },
        computed: {
            filteredItems: function() {
                console.log(this);
                if (!this.search) {
                    return this.items;
                }
                return this.items.filter(element => {
                    return element.item.toUpperCase().includes(this.search.toUpperCase());
                });
            },
        }
    }
</script>
