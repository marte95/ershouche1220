<template>
    <div>
        <h1>我是步骤2</h1>

        <input type="file" ref="fileCtrl" @change="changeHandle">
        <!-- <Button @click="upload">上传</Button> -->

        <p><img width="80" :src="preURL" v-show="preURL"></p>
        <p><Progress :percent="percent" status="active" /></p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                preURL: '',
                percent: 0
            }
        },
        methods: {
            upload(){
                // 创建虚拟表单
                const form = new FormData();
                // console.log(this.$refs.fileCtrl.files[0])
                // 将图片空间中的图片追加到虚拟表单中
                form.append('file', this.$refs.fileCtrl.files[0])

                // 发起Ajax请求上传图片
                const xhr = new XMLHttpRequest()

                // 上传进度事件，进行计算进步比例
                xhr.upload.onprogress = (e) => {
                    console.log(e)
                    this.percent = e.loaded / e.total * 100
                }

                // 成功的回调函数
                xhr.onreadystatechange = function () {
                    if(xhr.readyState === 4){
                        console.log(xhr.response)
                    }
                }

                // xhr.open('post', 'http://192.168.1.88/upload', true);
                // 由于onprogress上传进度事件不支持CORE跨域，所以使用代理跨域上传
                xhr.open('post', '/api/upload', true);
                xhr.send(form);  //要发送的内容
            },
            
            // 用户选择好图之后的事情
            changeHandle(){
                // 创建文件读取器
                const fileReader = new FileReader();
                // 读取用户选择的文件内容，读为URL地址（就是base64编号图片）
                fileReader.readAsDataURL(this.$refs.fileCtrl.files[0]) 
                
                // 读取完毕（此时还没上传）
                fileReader.onload = (e)=>{
                    this.preURL = e.target.result  //上传好图片，预览

                    this.upload();  //选好图自动执行上传图片事件
                }
            }
        }
    }
</script>

<style scoped>
    p{
        width: 300px;
        margin:10px 0;
    }
</style>