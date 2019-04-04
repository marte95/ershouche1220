<template>
    <div class="mask" @click="HideChangeAvatarLayer">
        <div class="inner":style="{width: w+'px', height:h+'px'}"  @click.stop="">
            <a href="###" class="closeBtn" @click="HideChangeAvatarLayer">×</a>

            <div v-if="fsm === 1">
                <input type="file" ref="fileCtrl" hidden @change="changeHandle">

                <Row>
                   <Col span="12">
                        <Button icon="ios-cloud-upload" @click="chooseImg">选择图片</Button>
                   </Col> 
                   <Col span="12">选择图片的尺寸不能大于2000kb</Col> 
                </Row>
            </div>

            <div v-if="fsm === 2">
                <Progress :percent="percent" status="active" hide-info />
            </div>

            <div v-if="fsm === 3">
                <div class="left">
                    <vueCropper ref="cropper" :img="'/api/uploads/' + picURL" :autoCrop="true">
                    </vueCropper>
                </div>
                <div class="right">
                    <Button @click="startCrop()">开始截图</Button>
                    <img :src="afterImg" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueCropper }  from 'vue-cropper' 
    export default {
        data(){
            return {
                w:400,
                h:100,
                fsm: 1,  //1 表示提示用户上传，2表示上传进度，3表示裁切图片
                percent:0,
                picURL:'',
                afterImg:'' 
            }
        },
        components: {
            VueCropper
        },
        methods: {
            // 裁剪图片
            startCrop(){
                this.$refs.cropper.getCropData((data) => {
                    this.afterImg = data  
                })
            },
            HideChangeAvatarLayer(){
                this.$bus.emit('HideChangeAvatarLayer')
            },

            // 模拟事件
            chooseImg(){
                var clickEvent=new MouseEvent('click');  //模拟鼠标事件
                this.$refs.fileCtrl.dispatchEvent(clickEvent); // 派发这个事件
            },

            // 监听file的change事件
            changeHandle(e){
                // 改变状态
                this.fsm = 2;
                this.h = 60;

                const form = new FormData();
                // 将图片空间中的图片追加到虚拟表单中
                form.append('file', e.target.files[0])

                // 发起Ajax请求上传图片
                const xhr = new XMLHttpRequest()

                // 上传进度事件，进行计算进步比例
                xhr.upload.onprogress = (e) => {
                    this.percent = e.loaded / e.total * 100
                }

                // 成功的回调函数
                xhr.onreadystatechange = () => {
                    if(xhr.readyState === 4){
                        this.picURL = JSON.parse(xhr.response).filename;
                        this.fsm = 3;
                        this.w = 1000;
                        this.h = 400;
                    }
                }

                xhr.open('post', '/api/upload', true);
                xhr.send(form);  //要发送的内容
            }
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
        background: rgba(0,0,0, 0.8);

        .inner {
            background #fff
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            padding 20px
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

            .left {
                float left
                width 500px
                height 360px
            }
            .right {
                float left
                width 400px
                margin-left 10px
                height 360px
            }
        }
    }
</style>