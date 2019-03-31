<template>
    <div v-if="id">
        <img :src="`http://192.168.1.88/images/carimages/${id}/${nowAlbum}/${pic}`">
    </div>
</template>

<script>
    export default {
        computed: {
            store(){
                return this.$store.state.carpicStore   //获取store
            },
            id() {
                return this.store.id  //车辆id
            },
            pic(){
                return this.store.result.images[this.nowAlbum][this.nowIdx]
            },
            nowAlbum(){
                return this.store.nowAlbum;  //当前显示的图集
            },
            nowIdx(){
                return this.store.nowIdx   //当前图集的id编号
            }
        }
    }
</script>

<style scoped lang="stylus">
    img{
        width 350px 
        height 300px
    }
</style>