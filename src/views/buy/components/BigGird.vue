<template>
    <div>
        <!-- 循环显示5行3列 -->
        <Row v-for="i in 5" :key="i" :gutter="10">
            <Col v-for="j in 3" :key="j" span="8">
                <OneGird v-if="results[(i-1) * 3 + (j-1)]" :info="results[(i-1) * 3 + (j-1)]">
                </OneGird>
            </Col>
        </Row>
        <MyPage></MyPage>
    </div>
</template>

<script>
    import OneGird from "./OneGird.vue"
    import MyPage from "./MyPage.vue"
    export default {
        created(){
            this.$store.dispatch('largeTableStore/changePageSize', {pagesize: 15})
        },
        components: {
            OneGird,
            MyPage
        },
        computed: {
            results(){
                return this.$store.state.largeTableStore.results
            }
        }
    }
</script>

<style scoped>

</style>