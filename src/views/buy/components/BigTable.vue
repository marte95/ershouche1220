<template>
    <div class="bigTable_wrap" @click="clickHandle">
        <!-- 扳手 -->
        <Button class="btn" type="primary" icon="md-build" shape="circle"       
            @click="showChangeColModal">
        </Button>

        <Table :columns="columns" :data="results" @on-sort-change="changeSort"></Table>
        <br>
        
        <!-- 分页条组件 -->
        <MyPage></MyPage>

        <br>
        <div v-if="isShowChangeColModal">
            <Modal :value="true" title="请您自定义表格的列顺序" @on-ok="ok" @on-cancel="cancel">
                <ChangeColSort ref="ccs"></ChangeColSort>
            </Modal>
        </div>
    </div>
</template>

<script>
    import columns from "../utils/columns.js"
    import ChangeColSort from "./ChangeColSort.vue"
    import MyPage from "./MyPage.vue"
    export default {
        created(){
            // 如果本地存储为空，设置本地存储，自定义存储一些key的顺序
            if(!localStorage.getItem('colSort')){
                localStorage.setItem('colSort', JSON.stringify(['id', 'avatar','brand','series','color','price' ,'km','gearbox', 'engine','buydate','exhaust','license']))
            }
        },
        data () {
            return {
                isShowChangeColModal: false,
                columns: columns(this.$store)
            }
        },
        computed: {
            results(){
                return this.$store.state.largeTableStore.results
            }
        },
        components: {
            ChangeColSort,
            MyPage
        },
        methods: {
            // 显示模态框
            showChangeColModal(){
                this.isShowChangeColModal = true
            },
            // 确定
            ok(){
                // 读取用户拖拽改变的顺序数组
                const arr = this.$refs.ccs.arr1;
                // 得到新的排序数组，写入本地存储，覆盖原有的
                localStorage.setItem('colSort', JSON.stringify(arr))
                // 重新更改列表
                this.columns = columns(this.$store)
                // 关闭模态框
                this.isShowChangeColModal = false
            },
            // 取消
            cancel(){
                this.isShowChangeColModal = false
            },
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
            changeSort({key, order}){
                this.$store.dispatch('largeTableStore/changeSort', {key, order})
            }
        }
    }
</script>

<style scoped>

</style>