<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="flightsData"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <FlightsItem v-for="(item,index) in dataList" :key="index" :item="item"/>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="flightsData.total"
                v-if="flightsData.flights.length">
                </el-pagination>


                <div v-if="flightsData.flights.length === 0 && !loading" style="padding: 50px; text-align:center">
                    还未开通该航班
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"


export default {
    data(){
        return {
            flightsData:{
                flights: [],
                info: {},
                options: {}
            },
            pageIndex:1,
            pageSize:5,
            loading:true
        }
    },
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters
    },
    methods:{
        handleSizeChange(val){
            this.pageSize = val
        },
        handleCurrentChange(val){
            this.pageIndex = val
        }
    },
    mounted(){
        this.$axios({
            url:'airs',
            params:this.$route.query
        }).then(res=>{
            console.log(res.data)
            this.flightsData = res.data
            this.loading = false
        })
    },
    computed:{
        dataList(){
            return this.flightsData.flights.slice(
                (this.pageIndex-1)*this.pageSize,
                this.pageIndex*this.pageSize
            )
        }
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>