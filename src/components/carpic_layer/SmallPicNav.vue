<template>
    <div class="wrap" v-if="store.id" @mouseleave="leavehandle">
        <div class="inner">
            <div class="unit" :style="{ left: -230 * nowPage + 'px' }">
                <ul v-for="i in totalPage" :key="i">
                    <li v-for="j in 6" :key="j" v-if="getThePic(i, j)" 
                        @click="changeNowIdx((i-1) * 6 + (j-1))"
                        :class="{'cur': (i-1) * 6 + (j-1) == nowIdx}"
                    >
                        <img :src="`http://192.168.1.88/images/carimages_small/${id}/${nowAlbum}/${getThePic(i, j)}`">
                    </li>
                </ul>
            </div>

            <ol class="pages">
                <li v-for="i in totalPage" v-if="totalPage != 1"
                    :style="{width:getW + 'px'}"
                    :class="{'cur': nowPage == (i-1)}"
                    @mouseenter="changeNowPage((i-1))"
                >
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                nowPage: 0 //因变量，它原则上是nowIdx算出来的，但用户能自己改变的
            }
        },
        methods: {
            // 获取当前图集中的某张图片
            getThePic(i, j){
                var index = (i-1) * 6 + (j-1); //计算当前图片的下标
                return this.store.result.images[this.nowAlbum][index];
            },
            // 用户触发图片改变当前显示的图片编号
            changeNowIdx(nowIdx){
                this.$store.commit('carpicStore/changeNowIdx', { nowIdx })
            },
            // 用户点击改变分页导航条的下标
            changeNowPage(page){
                this.nowPage = page
            },
            // 鼠标离开大盒子时，重新计算nowPage的位置，判断nowPage应该在哪
            leavehandle(){
                this.nowPage = parseInt(this.nowIdx / 6)
            }
        },
        computed: {
            // 计算li的宽度，因为li的个数不定，是根据总页数计算的
            getW(){
                // 盒子总款 - margin * 总页数 / 总页数 = li宽
                return (220 - 5 * (this.totalPage-1)) / this.totalPage
            },
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
        // 监控，自变量和因变量
        watch:{
            // 当store的nowIdx改变时，重新计算nowPage
            nowIdx(){
                this.nowPage = parseInt(this.nowIdx / 6)
            },
            // 当换车了，也需要重新算当前页的位置
            id(){
                this.nowPage = parseInt(this.nowIdx / 6)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .wrap{ 
        padding 10px
    }
    .inner { 
        overflow hidden
    }
    .unit{
        width:3000px; position: relative; transition: left 0.4s;
        ul{
            float: left; width: 230px;
            li{
                float:left; width:105px; height:70px;
                margin:0 10px 5px 0; overflow:hidden;
                position:relative;cursor:pointer;
                &::before{
                    content:""; position:absolute; z-Index:9999; transition:all 0.6s;
                    width:100%; height:100%; background: rgba(0,0,0,.6);
                }
                &.cur::before{ opacity: 0;}
                img{ width:100%; }
            }
        }
    }
    .pages{
        overflow:hidden; clear:both;
        li {
            list-style none
            float:left; /*width:50px;*/ height:16px; background: #ccc; margin-right:5px;
            &:last-child{ margin-right:0; }
            &.cur{ background: gold;}
        }
    }
</style>