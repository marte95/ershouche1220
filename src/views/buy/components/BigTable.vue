<template>
    <div class="bigTable_wrap" @click="clickHandle">
        <Row>
            <i-col span="18">
                <h3>根据当前查询条件，共找到{{total}}辆车符合条件</h3>
            </i-col>
        </Row>
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
            },
            total(){
                return this.$store.state.largeTableStore.total
            }
        },
        methods: {
            // 所以子元素的事件委托
            clickHandle(e){
                // 如果你点击的是图片
                if(e.target.nodeName.toLowerCase() === 'img'){
                    // 然后检查整改图片的祖父节点身上有没有data-id属性
                    if(e.target.parentNode.parentNode.hasAttribute('data-id')){
                        var id = e.target.parentNode.parentNode.getAttribute('data-id')
                        // 显示弹出层
                        this.$bus.emit('showShowCarpicLayer', {id})
                    }
                }

            }
        }
    }
</script>

<style scoped>

</style>