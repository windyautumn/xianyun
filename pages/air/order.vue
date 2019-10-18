<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm @getDetail="getDetail" @getAllPrice="getAllPrice"/>

            <!-- 侧边栏 -->
            <OrderAside :data="data" :allPrice="allPrice"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";
export default {
    data(){
        return{
            data:{
                seat_infos: {}
            },
            allPrice:0
        }
    },
    components:{
        OrderForm,
        OrderAside
    },
    methods:{
        getDetail(data){
            this.data = data
            console.log(data)
        },
        getAllPrice(price){
            this.allPrice = price
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>