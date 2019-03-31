<template>
    <div class="chooseAlbum" v-if="store.id">
        <ul>
            <li :class="{'cur': nowAlbum == 'view'}" @click="changeNowAlbum($event, 'view')">
                外观<br>（{{imgaes.view.length}}）
            </li>
            <li :class="{'cur': nowAlbum == 'inner'}" @click="changeNowAlbum($event, 'inner')">
                内饰<br>（{{imgaes.inner.length}}）
            </li>
            <li :class="{'cur': nowAlbum == 'engine'}" @click="changeNowAlbum($event, 'engine')">
                引擎<br>（{{imgaes.engine.length}}）
            </li>
            <li :class="{'cur': nowAlbum == 'more'}" @click="changeNowAlbum($event, 'more')">
                更多<br>（{{imgaes.more.length}}）
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        computed :{
            store(){
                return this.$store.state.carpicStore
            },
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum  //获取当前图集名称
            },
            imgaes(){
                return this.$store.state.carpicStore.result.images  //获取当前图集数组
            }
        },
        methods:{
            changeNowAlbum(e, nowAlbum){
                e.preventDefault();  //阻止默认事件
                this.$store.dispatch('carpicStore/changeNowAlbum', {nowAlbum})

                // 阻止浏览器默认行为
                return false;
            }
        }
    }
</script>

<style scoped lang='stylus'>
    .chooseAlbum {
        padding 10px
        ul {
            list-style none

            li {
                float left
                width 105px
                height 50px
                margin 0 10px 10px 0 
                padding-top 4px  
                font-size 15px
                text-align center
                line-height 20px
                border 1px solid #ccc
                cursor pointer

                &.cur {
                    background gold
                    color white
                    text-shadow 1px 1px 1px #000
                }
            }
        }
    }
</style>