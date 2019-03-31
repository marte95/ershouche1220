<template>
    <div class="mask" @click="hideShowCarpicLayer">
        <!-- .stop修饰符阻止事件冒泡，留空表示不做任何事情 -->
        <div class="inner" @click.stop="">
            <a href="###" class="closeBtn" @click="hideShowCarpicLayer">×</a>
            <div class="bigImgBox">
                <BigImg />
            </div>

            <div class="rightPart">
                <CarInfo />
                <ChooseAlbum />
                <div style="clear:both;"></div>
                <SmallPicNav />
            </div>
        </div>
    </div>
</template>
<script>
    import BigImg from "./BigImg"
    import CarInfo from "./CarInfo"
    import ChooseAlbum from "./ChooseAlbum"
    import SmallPicNav from "./SmallPicNav"

    export default {
        props:['carpiclayerId'],
        created(){
            // 已经就绪，触发异步命令，根据id发起Ajax请求
            this.$store.dispatch('carpicStore/init', this.carpiclayerId )
        },
        methods: {
            hideShowCarpicLayer(){
                this.$bus.emit('hideShowCarpicLayer')
            }
        },
        components: {
            BigImg,
            CarInfo,
            ChooseAlbum,
            SmallPicNav
        }
    }
</script>
<style scoped lang='stylus'>
    .mask{
        position: fixed;
        top:0;
        left:0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, 0.5);

        .inner {
            width 1000px
            height 500px
            background #fff
            position absolute
            top 50%
            left 50%
            margin-top -250px
            margin-left -500px
            .closeBtn {
                position: absolute;
                width: 36px;
                height: 36px;
                background-color: orange;
                right: -18px;
                top: -18px;
                border-radius: 50%;
                text-align: center;
                line-height: 34px;
                text-decoration: none;
                font-size: 38px;
                color: white;
                border: 2px solid white;
                font-family: "times new roman";
             }
            .bigImgBox{
                float left
                width 750px
            }

            .rightPart {
                float left
                width 250px
            }
        }
    }
</style>