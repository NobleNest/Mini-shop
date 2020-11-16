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
        <div class="product" v-for="(item) in filteredItems" v-bind:key="item.id">
            <div class="product-image">
                <img v-bind:src="item.src">
            </div>
            <div>
                <h4 class="product-title">
                    <router-link v-bind:to="'/product/' + item.id">
                        {{ item.item }}
                    </router-link>
                </h4>
                <label>{{item.price}}</label>
                <button v-on:click="addItem(item.id - 1)" class="btn">Add to cart</button>   
            </div>
        </div>
    </div>
</template>
<script>
    import products from '../data/products.js'

    export default {
        data: function () {
            return {
                items: [],
                search: '',
                searchResult: []
            };
        },
        mounted: function(){
            this.items = products;
        },
        methods:{
            addItem: function(index){
                this.$store.commit('setCart', this.items[index])
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
