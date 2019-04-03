<template>
    <div>
        <h1>我是步骤2</h1>
        <div class="beautiful_btn" @click="BeautifulBtn">好看的file按钮</div>
        <input hidden type="file" ref="fileCtrl" @change="changeHandle" multiple>
        <!-- <Button @click="upload">上传</Button> -->

        <TheOneItem v-for="(file, index) in files" :key="index" :file="file"></TheOneItem>
        
    </div>
</template>

<script>
    import TheOneItem from "./TheOneItem.vue"
    export default {
        data(){
            return {
                files:[]
            }
        },
        components: {
            TheOneItem
        },
        methods: {
            // 用户选择好图之后的事情
            changeHandle(){
                this.files = this.$refs.fileCtrl.files;
                console.log(this.$refs.fileCtrl.files)
            },

            // 好看的按钮，模拟事件触发
            BeautifulBtn(){
                var clickEvent=new MouseEvent('click');  //模拟鼠标事件
                this.$refs.fileCtrl.dispatchEvent(clickEvent); // 派发这个事件
            }
        }
    }
</script>

<style scoped>
    .beautiful_btn {
        width: 150px;
        height: 40px;
        border-radius: 10px;
        text-align: center;
        background: skyblue;
        cursor: pointer;
        line-height: 40px;
        font-size:16px;
        color:#fff;
    }
    p{
        width: 300px;
        margin:10px 0;
    }
</style>