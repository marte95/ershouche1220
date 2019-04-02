<template>
    <div class="filterBox_wrap">
        <Row v-for="item in fs" :key="item.english">
            <Col span="3">{{item.chinese}}</Col>
            <Col span="21">
                <div v-if="item.type == '复选框'">
                    <CheckboxGroup :value="getVbyK(item.english, item.type)" @on-change="changeHandle(item.english, $event, item.type)">
                        <Checkbox v-for="option in item.options" :label="option" :key="option">
                        </Checkbox>
                    </CheckboxGroup>
                </div>
                <div v-if="item.type == '范围条'">
                    <Row>
                        <Col span="12">
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

                <div v-if="item.type === '日期范围'">
                     <DatePicker type="daterange" placeholder="请选择购买时间" :clearable="false"
                        :value="getVbyK(item.english, item.type)" 
                        @on-change="changeHandle(item.english, $event, item.type)"
                     >
                     </DatePicker>
                </div>
            </Col>
        </Row>

        <Row style="margin-top:20px">
            <Col span="3" v-if='filters.length'>当前：</Col>
            <Col span="21">
                <Tag type="dot" color="primary" closable v-for="item in filters" 
                    @on-close="delTag(item.k)"
                >
                    {{showTagK(item.k)}}： {{showTagV(item.k, item.v)}}
                </Tag>
            </Col>
        </Row>
    </div>
</template>

<script>
    import moment from "moment"
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
            // 将英文的k名转换中文，显示k值
            showTagK(k){
                // 英文对应的中文字典
                const dictionary = {
                    brand: "品牌",
                    series: "车系",
                    color: "颜色",
                    price: '价格',
                    km: '公里数',
                    engine: "排量",
                    buydate: '购买日期',
                    exhaust: "环保",
                    gearbox: "变速箱",
                    fuel: "燃料"
                }
                return dictionary[k]  //根据传入的k返回对应的中文
            },

            // 格式化v值
            showTagV(k, v){
                if(k == 'color' || k == 'engine' || k == 'fuel' || k == 'gearbox' || k == 'exhaust' || k == 'brand'){
                    return v.replace(/v/g, ' 或 ')
                }else if (k == 'price'){
                    return v.split('to').map(item=>item + '万元').join(' 到 ')
                }else if (k == 'km'){
                    return v.split('to').map(item=>item/10000 + '万公里').join(' 到 ')
                }else if (k == 'buydate'){
                    return v.split('to').map(item=>moment(Number(item)).format('YYYY年MM月')).join(' 到 ')
                }
            },
            // 清空筛选条件和关闭标签
            delTag(k){
                // 清空当前k的所有筛选条件
                this.$store.dispatch('largeTableStore/changeFilter', {k, v: ''})
            },

            // 根据k获取v值
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
                        } else if(type === '日期范围'){
                            // return [new Date(2018, 8, 8), new Date(2019, 3, 8)]
                            return this.filters[i].v.split('to').map(item=>new Date(Number(item)))
                        } 
                    }
                }

                if(type === '复选框'){
                    return [] //如果filters中没有当前的k，则返回空数组
                }else if(type === '范围条'){
                    return [min / rate, max / rate] //返回计算后的最小和最大值
                } else if(type === '日期范围'){
                    return [] 
                } 
            },

            // 复选框触发筛选条件，得到当前的k和v值数组
            changeHandle(k, v, type, rate){
                if(type === '复选框'){
                    v = v.join('v');
                }else if( type === '范围条'){
                    v = v.map(item=>item * rate).join('to');
                } else if (type === '日期范围'){
                    v = v.map(item=>Date.parse(new Date(item))).join('to');
                }
                this.$store.dispatch('largeTableStore/changeFilter', {k, v})
            }
        }
    }
</script>

<style scoped>
    .ivu-row{
        height: 32px;
        line-height: 32px;
        font-size:14px;
    }
</style>