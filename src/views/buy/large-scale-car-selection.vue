<template>
    <div>
        <h1>汽车筛选器大表</h1>
        
        <FilterBox /> 
        <br>
        <Row>
            <i-col span="18">
                <h3>根据当前查询条件，共找到{{total}}辆车符合条件</h3>
            </i-col>
        </Row>
        <br>

        <RadioGroup v-model="view" type="button" size="large">
            <Radio label="table_view">表格视图</Radio>
            <Radio label="grid_view">网格视图</Radio>
        </RadioGroup>
        <BigTable v-if="view == 'table_view'"/> 
        <BigGird v-if="view == 'grid_view'" /> 
    </div>
</template>

<script>
    import FilterBox from "./components/FilterBox.vue"
    import BigTable from "./components/BigTable.vue"
    import BigGird from "./components/BigGird.vue"
    export default {
        data(){
            return {
                view: 'grid_view'
            }
        },
        created(){
            this.$store.dispatch('largeTableStore/init')
        },
        methods: {
            showLayer(id){
                // 触发showShowCarpicLayer事件，让弹出层显示
                this.$bus.$emit('showShowCarpicLayer', { id })
            }
        },
        computed:{
            total(){
                return this.$store.state.largeTableStore.total
            }
        },
        components:{
            FilterBox,
            BigTable,
            BigGird
        }
    }
</script>

<style scoped>

</style>