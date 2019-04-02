<template>
    <div class="grid_wrap">
        <p><img :src="`${url}/images/carimages_small/${info.id}/view/${info.avatar}`" ></p>
        <p>品牌：{{info.brand}} {{info.series}} </p>
        <p>{{info.color}}色 {{info.price}}万元 {{info.engine}}排量 </p>
        <p>{{info.km | wan}}万公里 购买时间：{{new Date(info.buydate).getFullYear()}}年</p>

        <Button @click="showPic">点击查看本车更多图集</Button>
    </div>
</template>

<script>
    export default {
        props:['info'],
        data(){
            return {
                url: process.env.VUE_APP_URL
            }
        },
        methods: {
            // 点击显示弹出层图集
            showPic(){
                this.$bus.emit('showShowCarpicLayer', {id: this.info.id})
            }
        }
    }
</script>

<style scoped>
    .grid_wrap {
        border: 1px solid #eee;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .grid_wrap p{
        font-size:14px;
        line-height: 26px;
    }
    img{
        width: 210px;
        border-radius: 5px;
    }
</style>