<template>
    <div>
        <h1>大表选车</h1>
        <Button v-for="i in 100" :key="i" @click="showLayer(100000 + i)">
            看{{100000 + i}}这车的图片
        </Button>
    </div>
</template>

<script>
    export default {
        methods: {
            showLayer(id){
                // 触发showShowCarpicLayer事件，让弹出层显示
                this.$bus.$emit('showShowCarpicLayer', { id })
            }
        }
    }
</script>

<style scoped>

</style>