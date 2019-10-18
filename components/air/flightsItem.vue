<template>
    <div class="flight-item">
        <div @click="flag = !flag">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{item.airline_name}} </span> {{item.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.dep_time}}</strong>
                            <span>{{item.org_airport_name}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{time}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.arr_time}}</strong>
                            <span>{{item.dst_airport_name}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{item.seat_infos[0].org_settle_price_child}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-if="flag">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row 
                    type="flex" 
                    justify="space-between" 
                    align="middle" 
                    class="flight-sell" 
                    v-for="(value,index) in item.seat_infos"
                    :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{value.group_name}}</span> | {{value.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{value.settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <nuxt-link :to="`/air/order?id=${item.id}&seat_xid=${value.seat_xid}`">
                            <!-- :to="`/air/order?id=${item.id}&seat_xid=${seat.seat_xid}`" -->
                                <el-button 
                                type="warning" 
                                size="mini">
                                选定
                                </el-button>
                            </nuxt-link>
                            <p>剩余：{{value.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            flag:false
        }
    },
    props: {
        // 数据
        item: {
            type: Object,
            // 默认是空数组
            default: {}
        },
    },
    computed:{
        time(){
            const arrTime = this.item.arr_time.split(':')
            const depTime = this.item.dep_time.split(':')
            const end = arrTime[0]*60 + +arrTime[1]
            const start = depTime[0]*60 + +depTime[1]
            let allTime = end - start
            if(allTime < 0) allTime += 24*60

            return `${ Math.floor(allTime / 60)}小时${allTime % 60}分`
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>