<template>
    <div>
        <!-- 左边栏布局SideLayout.vue，可以放侧边导航栏，右边放对应的显示内容了，而且还能使用meta给每个路由起名字，让左边栏的内容根据页面的不同，而显示不同的栏目标题。 -->
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu theme="light" width="auto" :open-names="[$store.state.routerStore.scolumn]"
                    :active-name="$store.state.routerStore.scolumn"
                    @on-select="changeMenu"
                    v-if="$store.state.routerStore.isShowSide"
                >
                    <MenuItem v-for="item in getTheOne.children" :name="item.en" :key="item.en">
                        {{item.cn}}
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>
                        <router-link to="/index/index">首页</router-link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <router-link :to="'/index/' + getTheOne.columnEnglish">
                            {{getTheOne.columnChinese}}
                        </router-link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {{$store.state.routerStore.scolumnc}}
                    </BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>        
    </div>
</template>
<script>
    import buyRoute from "../router/buyRoute.js"
    import transferRoute from "../router/transferRoute.js"

    // 路由对象
    const obj = {
        buy: buyRoute,
        transfer: transferRoute
    }

    export default {
        created(){
            // 让侧边栏上树高亮，这里为了解决cur类不变化的问题
            this.$store.commit('routerStore/changeIsShowSide', { isShowSide: true})
        },
        updated(){
            this.$store.commit('routerStore/changeIsShowSide', { isShowSide: true})
        },
        computed:{
            // 动态获取当前栏目的路由对象
            getTheOne(){
                return obj[this.$store.state.routerStore.column]
            }
        },
        methods:{
            // 点击获取当前MenuItem的name属性，然后切换侧边栏路由
            changeMenu(name){
                this.$router.push({name})
            }
        }
    }
</script>

<style scoped>

</style>