<template>
    <div class="filterBox_wrap">
        <Row v-for="item in fs" :key="item.english">
            <Col span="3">{{item.chinese}}</Col>
            <Col span="21">
                <CheckboxGroup :value="getVbyK(item.english)" @on-change="changeHandle(item.english, $event)">
                    <Checkbox v-for="option in item.options" :label="option" :key="option">
                    </Checkbox>
                </CheckboxGroup>
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
            getVbyK(k){
                // console.log(k)
                // 遍历state的filters数组
                // 如果数组中有k，并且k和data中的fs中的k相等，则返回v值
                for(let i = 0; i < this.filters.length;i++){
                    if(this.filters[i].k === k){
                        return this.filters[i].v.split('v') //分割字符串返回数组
                    }
                }

                return [] //如果filters中没有当前的k，则返回空数组
            },

            // 复选框触发筛选条件，得到当前的k和v值数组
            changeHandle(k, v){
                this.$store.dispatch('largeTableStore/changeFilter', {k, v: v.join('v')})
            }
        }
    }
</script>

<style scoped>

</style>