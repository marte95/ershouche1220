<template>
    <div class="wrap">
        <h3>品牌：{{result.brand}} {{result.series}}</h3>
        <h3>售价：{{result.price}}万 {{result.color}}色 {{result.fuel}}</h3>
        <h4>
            {{result.km | wan}}万公里
            {{result.engine}}{{result.gearbox}}
            {{new Date(result.buydate).getFullYear()}}年{{new Date(result.buydate).getMonth()}}月
        </h4>
    </div>
</template>

<script>
    export default {
        computed: {
            result(){
                return this.$store.state.carpicStore.result
            }
        }
    }
</script>

<style scoped>
    .wrap {
        padding:10px;
    }
    h3{font-size:16px; color:#333;}
    h4{font-size:14px;}
</style>