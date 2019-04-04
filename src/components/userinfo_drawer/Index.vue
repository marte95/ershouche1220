<template>
    <div>
        <Drawer width="500" title="更改个人资料" :value="isShowUserInfoDrawser"
            @on-close="colseHandle"
        >
             <Avatar :src="`/api/uploads/${store.avatar}`" />
             <Form ref="formInline">
                <FormItem label="用户名">
                    <Input type="text" :value="store.username">
                    </Input>
                </FormItem>
                <FormItem label="昵称">
                    <Input type="text" v-model="store.nickname"></Input>
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="store.sex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机号">
                    <Input type="text" v-model="store.mobile"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">更改</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    export default {
        props: ['isShowUserInfoDrawser'],
        computed:{
            store(){
                return this.$store.state.meStore
            }
        },
        created(){
            this.$store.dispatch('meStore/fetchUserInfo');  //拉取个人信息的数据
        },
        methods: {
            colseHandle(){
                // 关闭抽屉
                this.$bus.emit('HideUserInfoDrawer')
            },
            handleSubmit(){

            }
        }
    }
</script>

<style scoped>

</style>