<template>
    <div>
        <h1>汽车筛选器大表</h1>
        
        <FilterBox /> 
        <BigTable /> 
    </div>
</template>

<script>
    import FilterBox from "./components/FilterBox.vue"
    import BigTable from "./components/BigTable.vue"
    export default {
        methods: {
            showLayer(id){
                // 触发showShowCarpicLayer事件，让弹出层显示
                this.$bus.$emit('showShowCarpicLayer', { id })
            }
        },
        components:{
            FilterBox,
            BigTable
        }
    }
</script>

<style scoped>

</style>