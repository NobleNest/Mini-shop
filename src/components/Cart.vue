<template>
    <div>
        This is cart \(-_-)/
        <div class="product" v-for="(item, index) in items" v-bind:key="index">
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
            </div>
        </div>
        <h2>Total Price: {{ sum }}</h2>
        <button v-on:click="clearAll()" class="btn">Clear Cart</button> 
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                items: [],
            };
        },
        mounted: function(){
            this.items = this.$store.getters.getCart
            console.log(this.items)
        },
        methods:{
            clearAll: function(){
                this.$store.commit('clearCart')
                this.items = []
            }
        },
        computed: {
            sum: function() {
                let sum = 0
                for(let i = 0; i < this.items.length; i++){
                    sum = sum + this.items[i].price
                }
                return sum
            },
        }
    }
</script>