<template>
    <div class="bigTable_wrap" @click="clickHandle">
        <br>
        <br>
        <Row>
            <i-col span="18">
                <h3>根据当前查询条件，共找到{{total}}辆车符合条件</h3>
            </i-col>
        </Row>
        <br>

        <!-- 扳手 -->
        <Button class="btn" type="primary" icon="md-build" shape="circle"       
            @click="showChangeColModal">
        </Button>

        <Table :columns="columns" :data="results" @on-sort-change="changeSort"></Table>
        <br>
        <Page show-elevator show-sizer show-total 
            :current="page" :page-size="pagesize" :total="total" 
            @on-change="changePage" @on-page-size-change="changePageSize"
        />

        <br>
        <div>
        </div>
    </div>
</template>

<script>
    import columns from "../columns.js"
    export default {
        created(){
            // 如果本地存储为空，设置本地存储，自定义存储一些key的顺序
            if(!localStorage.getItem('colSort')){
                localStorage.setItem('colSort', JSON.stringify(['id', 'avatar','brand','series','color','price' ,'km','gearbox', 'engine','buydate','exhaust','license']))
            }
        },
        data () {
            return {
                columns: columns(this.$store)
            }
        },
        computed: {
            results(){
                return this.$store.state.largeTableStore.results
            },
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
            },
            // 改变分页页码
            changePage(page){
                this.$store.dispatch('largeTableStore/changePage', { page })
            },
            // 改变每页显示的数量
            changePageSize(pagesize){
                this.$store.dispatch('largeTableStore/changePageSize', { pagesize })
            },
            changeSort({key, order}){
                this.$store.dispatch('largeTableStore/changeSort', {key, order})
            }
        }
    }
</script>

<style scoped>

</style>