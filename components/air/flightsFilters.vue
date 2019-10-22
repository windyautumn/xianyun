<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flights.airport" placeholder="起飞机场">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flights.flightTimes"  placeholder="起飞时间" >
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flights.company"  placeholder="航空公司" >
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flights.airSize" placeholder="机型">
                    <el-option
                    v-for="(item,index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            flights:{
                airport: "",        // 机场
                flightTimes: "",    // 出发时间
                company: "",        // 航空公司
                airSize: "",        // 机型大小
            },
            sizeOptions:[
                {name: "大", size: "L"},
                {name: "中", size: "M"},
                {name: "小", size: "S"},
            ]
        }
    },
    props:{
        data:{
            type:Object,
            default: {}
        }
    },
    watch:{
        flights:{
            deep:true,
            handler(){
                var arr = this.data.flights.filter(v=>{
                    let flag = true
                    if(this.flights.airport && this.flights.airport !== v.org_airport_name){
                        flag = false
                    }
                    if(this.flights.flightTimes){
                        const arr = this.flights.flightTimes.split(',')
                        const start = v.dep_time.split(":")[0]
                        if(start < +arr[0] || start >= +arr[1]){
                            flag = false;
                        }
                    }
                    if(this.flights.company && this.flights.company !== v.airline_name){
                        flag = false
                    }
                    if(this.flights.airSize && this.flights.airSize !== v.plane_size){
                        flag = false
                    }
                    return flag
                })
                this.$emit('handleFilter',arr)
            }
        }
    },
    methods: {
        // 选择机场时候触发
        // 选择出发时间时候触发

         // 选择航空公司时候触发
         // 选择机型时候触发
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport= ""       // 机场
            this.flightTimes= ""    // 出发时间
            this.company= ""       // 航空公司
            this.airSize= ""        // 机型大小
            this.$emit('handleFilter',this.data.flights)
        },
    },
    mounted(){
      
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>