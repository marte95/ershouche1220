<template>
    <div>
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo">
                    <a href="/index/index">
                        <img src="http://aiqianduan.com/assets/images/logo.png" width="170">
                    </a>
                </div>
                <div class="layout-nav">
                    <MenuItem name="1">
                        <Icon type="ios-navigate"></Icon>
                        首页
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon type="ios-keypad"></Icon>
                        买车
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-analytics"></Icon>
                        买车
                    </MenuItem>
                    <MenuItem name="4">
                        <Icon type="ios-paper"></Icon>
                        过户
                    </MenuItem>
                    <MenuItem name="5">
                        <Icon type="ios-paper"></Icon>
                        保险
                    </MenuItem>
                    <MenuItem name="6">
                        <Icon type="ios-paper"></Icon>
                        停车场
                    </MenuItem>
                </div>
            </Menu>
        </Header>
        <!-- 二级路由的电视 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
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
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 650px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>