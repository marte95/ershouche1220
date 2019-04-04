<template>
    <div>
        <Header>
            <Menu mode="horizontal" theme="dark" 
                :active-name="$store.state.routerStore.column"
                @on-select="changeMenuHandle"
            >
                <div class="layout-logo">
                    <a href="/index/index">
                        <img src="http://aiqianduan.com/assets/images/logo.png" width="170">
                    </a>
                </div>
                <div class="layout-nav">
                    <MenuItem name="index">
                        <Icon type="ios-navigate"></Icon>
                        首页
                    </MenuItem>
                    <MenuItem name="buy">
                        <Icon type="ios-keypad"></Icon>
                        买车
                    </MenuItem>
                    <MenuItem name="sale">
                        <Icon type="ios-analytics"></Icon>
                        卖车
                    </MenuItem>
                    <MenuItem name="transfer">
                        <Icon type="iods-paper"></Icon>
                        过户
                    </MenuItem>
                    <MenuItem name="insurance">
                        <Icon type="ios-paper"></Icon>
                        保险
                    </MenuItem>
                    <MenuItem name="parking">
                        <Icon type="ios-paper"></Icon>
                        停车场
                    </MenuItem>
                </div>
                <div class="info">
                    <Dropdown @on-click="clickHandle">
                        <a href="###">
                            <Avatar :src="`/api/uploads/${store.avatar}`" />
                            {{store.nickname}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="更改资料">更改资料</DropdownItem>
                            <DropdownItem name="更改头像">更改头像</DropdownItem>
                            <DropdownItem name="我的任务">我的任务</DropdownItem>
                            <DropdownItem name="退出登录">退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Menu>
        </Header>
        <!-- 二级路由的电视 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        computed: {
            store(){
                return this.$store.state.meStore
            }
        },
        methods:{
            changeMenuHandle(name){
                this.$router.push({name})
            },
            clickHandle(name){
                if(name === '更改资料'){
                    // 弹出抽屉
                    this.$bus.emit('ShowUserInfoDrawer')
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .info a {
        color:#fff;
        padding:0 10px;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 10px;
        left: 20px;
    }
    .layout-nav{
        width: 800px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
    .ivu-layout-header{
        background: -webkit-linear-gradient(left top, #137dba, #77cbd7b0 20%, #5a6ce3);
    }
    .ivu-menu-dark{
        background: transparent;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active{
        background-color: gold;
    }
    .ivu-menu-item{
        font-size:18px;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item{
        color:#fff;
    }
</style>