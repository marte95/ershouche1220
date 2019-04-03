<template>
    <div>
        <h1>我是步骤2</h1>

        <!-- <form action="http://192.168.1.88/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit">
        </form> -->

        <input type="file" ref="fileCtrl">
        <Button @click="upload">上传</Button>

    </div>
</template>

<script>
    export default {
        methods: {
            upload(){
                // 创建虚拟表单
                const form = new FormData();
                // console.log(this.$refs.fileCtrl.files[0])
                // 将图片空间中的图片追加到虚拟表单中
                form.append('file', this.$refs.fileCtrl.files[0])

                // 发起Ajax请求上传图片
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = function () {
                    if(xhr.readyState === 4){
                        console.log(xhr.response)
                    }
                }

                xhr.open('post', 'http://192.168.1.88/upload', true);
                xhr.send(form);  //要发送的内容
            }
        }
    }
</script>

<style scoped>

</style>