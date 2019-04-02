<template>
    <div class="filterBox_wrap">
        <Row v-for="item in fs" :key="item.english">
            <Col span="3">{{item.chinese}}</Col>
            <Col span="21">
                <div v-if="item.type == '复选框'">
                    <CheckboxGroup :value="getVbyK(item.english)" @on-change="changeHandle(item.english, $event, item.type)">
                        <Checkbox v-for="option in item.options" :label="option" :key="option">
                        </Checkbox>
                    </CheckboxGroup>
                </div>
                <div v-if="item.type == '范围条'">
                    <Row>
                        <Col span="12">
                            {{getVbyK(item.english, item.type,item.max, item.min,item.rate)}}
                            <!-- {{item.min / item.rate}} {{item.max / item.rate}} -->
                            <Slider range :min="item.min / item.rate" :max="item.max / item.rate" 
                                :value="getVbyK(item.english, item.type, item.max, item.min,item.rate)"
                                @on-change="changeHandle(item.english, $event, item.type, item.rate)"
                            >
                            </Slider>
                        </Col>

                        <Col span="11" offset="1">
                            <My2InputAndButton :max="item.max / item.rate" :min="item.min /item.rate"
                                :value="getVbyK(item.english, item.type, item.max,item.min,item.rate)"
                                @click="changeHandle(item.english, $event, item.type, item.rate)"
                            >
                            </My2InputAndButton>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import filterBox from "../filterBox.js"
    import My2InputAndButton from "./My2InputAndButton.vue"
    export default {
        data(){
            return {
                fs: filterBox
            }
        },
        computed: {
            filters(){
                return this.$store.state.largeTableStore.filters
            }
        },
        components:{
            My2InputAndButton
        },
        methods:{
            getVbyK(k, type, max, min , rate){
                // 遍历state的filters数组
                // 如果数组中有k，并且k和data中的fs中的k相等，则返回v值
                for(let i = 0; i < this.filters.length;i++){
                    if(this.filters[i].k === k){
                        if(type === '复选框'){
                            return this.filters[i].v.split('v') //分割字符串返回数组
                        }else if(type === '范围条'){
                            // 返回长度为2的数组，四舍五入
                            return this.filters[i].v.split('to').map(item=>Math.round(Number(item) / rate))
                        }
                    }
                }

                if(type === '复选框'){
                    return [] //如果filters中没有当前的k，则返回空数组
                }else if(type === '范围条'){
                    return [min / rate, max / rate] //返回计算后的最小和最大值
                }
            },

            // 复选框触发筛选条件，得到当前的k和v值数组
            changeHandle(k, v, type, rate){
                if(type === '复选框'){
                    v = v.join('v')
                }else if( type === '范围条'){
                    v = v.map(item=>item * rate).join('to')
                }
                this.$store.dispatch('largeTableStore/changeFilter', {k, v})
            }
        }
    }
</script>

<style scoped>

</style>