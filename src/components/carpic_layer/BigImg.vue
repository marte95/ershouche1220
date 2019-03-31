<template>
    <div v-if="id">
        <LoadingGifImage :src="`${url}/images/carimages/${id}/${nowAlbum}/${pic}`" w="750" h="500" />
    </div>
</template>

<script>
    export default {
        data(){
            return {
                url: process.env.VUE_APP_URL
            }
        },
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
        width 750px 
        height 500px
    }
</style>