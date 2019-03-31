<template>
    <div v-if="id" class="bigimg">
        <div class="leftBtn" @click="goPrev"></div>
        <div class="rightBtn" @click="goNext"></div>
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
        },
        methods:{
            goPrev(){
                this.$store.dispatch("carpicStore/goPrev")
            },
            goNext(){
                this.$store.dispatch("carpicStore/goNext")
            }
        }
    }
</script>

<style scoped lang="stylus">
    .bigimg{
        position relative
        .leftBtn {
            position absolute
            top 0
            left 0
            z-index 10000
            width 50%
            height 100%
            cursor url(/images/picture-cursor-left.cur), auto
        }
        .rightBtn {
            position absolute
            top 0
            right 0
            z-index 10000
            width 50%
            height 100%
            cursor url(/images/picture-cursor-right.cur), auto
        }

        img{
            width 750px 
            height 500px
        }
    }
    
</style>