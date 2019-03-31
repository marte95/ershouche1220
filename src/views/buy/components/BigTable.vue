<template>
    <div class="bigTable_wrap">
        <h1>大表</h1>
        <Table :columns="columns" :data="results"></Table>
    </div>
</template>

<script>
    import columns from "../columns.js"
    export default {
        data () {
            return {
                columns
            }
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