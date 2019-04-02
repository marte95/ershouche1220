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
                            <Slider range :min="item.min" :max="item.max" 
                                :value="getVbyK(item.english, item.type)"
                                @on-change="changeHandle(item.english, $event, item.type)"
                            >
                            </Slider>
                        </Col>
                        <Col span="11" offset="1">
                            {{getVbyK(item.english, item.type)}}
                            <InputNumber :max="item.max" :min="item.min" size="small" 
                                :value="getVbyK(item.english, item.type)[0]"
                            >
                            </InputNumber>
                             ~ 
                            <InputNumber :max="item.max" :min="item.min" size="small" 
                                :value="getVbyK(item.english, item.type)[1]"
                            >
                            </InputNumber>
                            <Button type="primary" size="small">确定</Button>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import filterBox from "../filterBox.js"
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
        methods:{
            getVbyK(k, type){
                // 遍历state的filters数组
                // 如果数组中有k，并且k和data中的fs中的k相等，则返回v值
                for(let i = 0; i < this.filters.length;i++){
                    if(this.filters[i].k === k){
                        if(type === '复选框'){
                            return this.filters[i].v.split('v') //分割字符串返回数组
                        }else if(type === '范围条'){
                            // 返回长度为2的数组
                            return this.filters[i].v.split('to').map(item=>Number(item))
                        }
                    }
                }

                return [] //如果filters中没有当前的k，则返回空数组
            },

            // 复选框触发筛选条件，得到当前的k和v值数组
            changeHandle(k, v, type){
                if(type === '复选框'){
                    v = v.join('v')
                }else if( type === '范围条'){
                    v = v.join('to')
                }
                
                this.$store.dispatch('largeTableStore/changeFilter', {k, v})
            }
        }
    }
</script>

<style scoped>

</style>