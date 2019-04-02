<template>
    <div>
        <Page show-elevator show-sizer show-total 
            :current="page" :page-size="pagesize" :total="total" 
            @on-change="changePage" @on-page-size-change="changePageSize"
        />
    </div>
</template>

<script>
    export default {
        computed: {
            total(){
                return this.$store.state.largeTableStore.total
            },
            page(){
                return this.$store.state.largeTableStore.page
            },
            pagesize(){
                return this.$store.state.largeTableStore.pagesize
            }
        },
        methods: {
            // 改变分页页码
            changePage(page){
                this.$store.dispatch('largeTableStore/changePage', { page })
            },
            // 改变每页显示的数量
            changePageSize(pagesize){
                this.$store.dispatch('largeTableStore/changePageSize', { pagesize })
            },
        }
    }
</script>

<style scoped>

</style>