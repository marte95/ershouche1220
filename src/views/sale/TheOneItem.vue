<template>
    <div class="wrap_item">
        <p><Progress :percent="percent" status="active" /></p>
        <p><img :src="preURL" v-show="preURL"></p>
    </div>
</template>

<script>
    export default {
        props:['file'],
        data(){
            return {
                preURL: '',
                percent: 0
            }
        },
        created(){
            // 创建文件读取器
            const fileReader = new FileReader();
            // 读取用户选择的文件内容，读为URL地址（就是base64编号图片）
            fileReader.readAsDataURL(this.file) 
            
            // 读取完毕（此时还没上传）
            fileReader.onload = (e)=>{
                this.preURL = e.target.result  //上传好图片，预览

                //选好图自动执行上传图片
                // 创建虚拟表单
                const form = new FormData();
                // 将图片空间中的图片追加到虚拟表单中
                form.append('file', this.file)

                // 发起Ajax请求上传图片
                const xhr = new XMLHttpRequest()

                // 上传进度事件，进行计算进步比例
                xhr.upload.onprogress = (e) => {
                    this.percent = e.loaded / e.total * 100
                }

                // 成功的回调函数
                xhr.onreadystatechange = function () {
                    if(xhr.readyState === 4){
                        console.log(xhr.response)
                    }
                }

                xhr.open('post', '/api/upload', true);
                xhr.send(form);  //要发送的内容
            }
        }
    }
</script>

<style scoped>
    .wrap_item{
        float: left;
        width: 230px;
        min-height: 200px;
        border: 1px solid #000;
        margin:10px;
        padding:10px;
    }
    img{
        width: 100%;
    }
</style>