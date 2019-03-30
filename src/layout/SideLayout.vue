<template>
    <div>
        <!-- 左边栏布局SideLayout.vue，可以放侧边导航栏，右边放对应的显示内容了，而且还能使用meta给每个路由起名字，让左边栏的内容根据页面的不同，而显示不同的栏目标题。 -->
        <Layout>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <MenuItem name="1-1">Option 1</MenuItem>
                        <MenuItem name="1-2">Option 2</MenuItem>
                        <MenuItem name="1-3">Option 3</MenuItem>
                    </Menu>
                </Sider>
            </Layout>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>