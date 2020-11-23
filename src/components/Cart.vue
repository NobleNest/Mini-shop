<template>
    <div>
        This is cart \(-_-)/
        <div class="product" v-for="(item, index) in items" v-bind:key="index">
                {{ item.count }}
            <div>
                <h4 class="product-title">
                    <router-link v-bind:to="'/product/' + item.id">
                        {{ item.item }}
                    </router-link>
                </h4>
                <label>{{item.price}}</label> 
                <button v-on:click="add(item)" class="btn">+</button>  
                <button v-on:click="sub(item)" class="btn">-</button>  
            </div>
        </div>
        <h2>Total Price: {{ sum }}</h2>
        <button v-on:click="clearAll()" class="btn">Clear Cart</button> 
        <button v-on:click="sendData()" class="btn">Send</button>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


    export default {
        data: function () {
            return {
                items: [],
                cart: [],
                itemsAll: [],
                record:[]
            };
        },
        mounted: function(){
            this.cart = this.$store.getters.getCart
            this.itemsAll = this.cart.map(function(current) { 
            let item = Object.assign({}, current);
                item.count = 1
                return item;
            });
            console.log(this.cart)
            console.log("-----------------------------")
            console.log(this.itemsAll)
            console.log("-----------------------------")
            this.items = this.removeDuplicates(this.itemsAll, "item");
            console.log(this.items)
            this.setCount()
        },
        methods:{
            clearAll: function(){
                this.$store.commit('clearCart')
                this.items = []
            },
            removeDuplicates: function(originalArray, prop) {
                var newArray = [];
                var lookupObject  = {};

                for(var i in originalArray) {
                    lookupObject[originalArray[i][prop]] = originalArray[i];
                }

                for(i in lookupObject) {
                    newArray.push(lookupObject[i]);
                }
                return newArray;
            },
            setCount: function(){
                for(let i = 0; i < this.items.length;i++){
                    let count= 0
                    for(let j = 0; j < this.itemsAll.length;j++){
                        if(this.items[i].item === this.itemsAll[j].item){
                            count++
                        }
                    }
                    this.items[i].count = count
                }
            },
            add: function(item){
                item.count+=1
            },
            sub: function(item){
                if(item.count>0){
                    item.count-=1
                }
                else{
                    alert("Кількість товарів не може бути менше 0")
                }
            },
            db: function(){

            },
            async sendData() {
                for(let i = 0;i < this.items.length; i++){
                    console.log(await axios({
                        url: 'http://localhost:3000/cart',
                        method: 'post',
                        data: {
                            "item": this.items[i].item,
                            "count": this.items[i].count,
                            "price": this.items[i].price,
                        }
                    }));
                    /*axios.post("http://localhost:3000/cart",{
                        "name": this.items[i].item,
                        "count": this.items[i].count,
                        "price": this.items[i].price,
                    }).then((response) =>{
                        console.log("Success");
                    })*/
                }
            }
        },
        computed: {
            sum: function() {
                let sum = 0
                for(let i = 0; i < this.items.length; i++){
                    sum = sum + this.items[i].price * this.items[i].count
                }
                return sum
            },
        }
    }
</script>