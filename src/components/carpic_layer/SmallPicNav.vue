<template>
    <div class="wrap" v-if="store.id">
        <div class="inner">
            <div class="unit">
                {{totalPage}}
                <ul v-for="i in totalPage" :key="i">
                    <li v-for="j in 6" :key="j" v-if="getThePic(i, j)">
                        <img :src="`http://192.168.1.88/images/carimages_small/${id}/${nowAlbum}/${getThePic(i, j)}`">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            getThePic(i, j){
                var index = (i-1) * 6 + (j-1); //计算当前图片的下标
                return this.store.result.images[this.nowAlbum][index];
            }
        },
        computed: {
            store(){
                return this.$store.state.carpicStore
            },
            // 图片总张数
            totalImgaesNumber(){
                // 根据当前图集的图片数组，得到当前图集的图片总数
                return this.store.result.images[this.nowAlbum].length
            },
            // 图片总页数
            totalPage(){
                // 当前图集的图片总数除以6（向上取整）
                return Math.ceil(this.totalImgaesNumber / 6)
            },
            nowAlbum(){
                return this.store.nowAlbum  //获取当前图集名称
            },
            
            id (){
                return this.store.result.id  //获取当前车辆的id
            },

            nowIdx() {
                return this.store.nowIdx  //得到当前图集的idx编号
            }
        },
    }
</script>

<style scoped lang="stylus">
    .wrap{ padding:10px;
        .inner{ overflow:hidden; }
    }
    .unit{
        width:3000px; position: relative;
        ul{
            list-style:none; float:left; width:230px;
            li{
                float:left; width:105px; margin-right:10px;
                img{ width:100%; }
            }
        }
    }
</style>