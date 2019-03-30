export default {
    namespaced: true,
    state: {
        // 当前所在栏目
        column:''
    },
    mutations: {
        // 改变栏目，每个路由的meta中有一个column属性，声明着路由的名字，拿到之后我们将改变state的column
        changeColumn(state, { column }){
            state.column = column;
        }
    },
    actions: {

    }
}