<template>
    <div class="image_wrap" :style="{width: w + 'px', height: h + 'px'}">
        <img :src="src" ref="pic" :style="{width: w + 'px', height: h + 'px', display:'none'}">
        <b ref="loadinggif"></b>
    </div>
</template>

<script>
    export default {
        props: ['src', 'w', 'h'],
        // 生命周期
        beforeUpdate(){
            this.$refs.loadinggif.style.display = 'block';
            this.init()
        },
        mounted () {
            this.init()
        },

        methods:{
            init(){
                const img = new Image()
                img.src = this.src;

                // 图片加载完毕显示图片，隐藏loading图
                img.onload = ()=>{
                    this.$refs.pic.style.display = 'block';
                    this.$refs.loadinggif.style.display = 'none';
                }
            }
        }
    }
</script>
<style scoped>
    .image_wrap{
        position: relative;
    }
    .image_wrap b {
        position: absolute;
        top:50%;left:50%;
        transform:translate(-50%, -50%);
        width: 80px;height: 80px;
        background:rgba(0,0,0, 0.5);
        background: url(/images/loading.svg) no-repeat;
    }
</style>