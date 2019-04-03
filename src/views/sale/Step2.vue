<template>
    <div>
        <h1>我是全新的步骤2，使用插件上传</h1>
        
        <h3>请上传内饰图片</h3>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

        <h3>请上传外观图片</h3>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

        <h3>请上传发动机图片</h3>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
    </div>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    export default {
        name: 'app',
        components: {
            vueDropzone: vue2Dropzone
        },
        data: function () {
            return {
                dropzoneOptions: {
                    url: '/api/upload',  //上传图片的地址
                    thumbnailWidth: 150, //缩略图的宽度
                    dictDefaultMessage: '<h2>请上传图片</h2>'
                    // maxFilesize: 0.5,    //文件最大上传尺寸
                    // headers: { "My-Awesome-Header": "header value" }
                }
            }
        }
    }
</script>

<style scoped>
    
</style>