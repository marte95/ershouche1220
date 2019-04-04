<template>
    <div class="wrap">
        <div class="inner">
            <h1>登录</h1>
            <Form ref="formInline" :model="form">
                <FormItem prop="user">
                    <Input type="text" v-model="form.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="form.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="btn" type="primary" @click="doSubmit">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import axios from "axios" 
    export default {
        data () {
            return {
                form: {
                    username: 'Marte',
                    password: '123456'
                }
            }
        },
        methods: {
            async doSubmit(){
                const {result, token} = await axios.post('/api/login', {
                    username: this.form.username,
                    password: this.form.password
                }).then(res=>res.data)

                // 登录成功，获取到token
                if(result === 1 && token){
                    // 将token存储到本地
                    localStorage.setItem('token', token);
                    // 登录成功页面跳转到首页
                    this.$router.push({name:'index'})
                } else {
                    this.$Message.error('请输入正的账号和密码！')
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    h1{
        text-align center
        margin 20px
    }
    .wrap{
        position fixed
        top 0
        left 0 
        width 100%
        height 100%
        
        background-image -webkit-linear-gradient(top left, #63a6eb, #204a95)
        .inner{
            position absolute
            top 50%
            left 50%
            width 500px
            height 300px
            border-radius 10px
            transform translate(-50%, -50%);
            padding 10px
            background #fff
        }
        .btn {
            margin: 20px auto;
            display block
        }

    }
</style>