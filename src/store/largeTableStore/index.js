import querystring from "querystring"

export default {
    namespaced: true,
    state: {
        page: 1,   //页码
        pagesize: 10,  //每页显示数量
        // 排序条件
        sort: {
            sortby: 'id',
            sortdirection: 1
        },

        //存储筛选过滤的条件
        filters: [
            // { k: 'color', v: '红v白v'},
            // { k: 'engine', v: '1.6Lv2.0L'},
            { k: 'price', v: '0to100'},
            { k: 'km', v: '0to300000'},
        ],  
        results:[],   // 根据当前筛选条件，得到本页的数据（数据来自于服务器）
        total: 0,     // 根据当前筛选条件，得到数据总数量（数据来自于服务器）
        page_amount:0 // 当前页数量
    },
    mutations: {
        // 修改页码
        changePage(state, {page}){
            state.page = page
        },
        // 修改每页显示的数量
        changePageSize(state, { pagesize }) {
            state.pagesize = pagesize
        },
        // 修改排序条件
        changeSort(state, { sort }) {
            state.sort = sort
        },
        // 修改结果数组
        changeResults(state, { results }) {
            state.results = results
        },
        // 修改数据总数据
        changeTotal(state, { total }) {
            state.total = total
        },
        // 修改当前页数量
        changePageAmount(state, { page_amount }) {
            state.page_amount = page_amount
        },
        changeSort(state, payload){
            state.sort = payload
        },
        // 增加筛选条件，将新的k：v对象添加到filters数组中
        addFilter(state, {k ,v}){
            state.filters.push({k, v})
        },
        // 修改筛选条件，根据k从filters数组中修改v值
        updateFilter(state, {k ,v}){
            state.filters = state.filters.map(item=>item.k === k ? {...item, v} : item)
        },
        // 删除筛选条件，根据k从filters数组中删除当前对象
        removeFilter(state, {k}){
            state.filters = state.filters.filter(item=> item.k !== k)
        }
    },
    actions: {
        async init ({commit, state}){
            // 查询对象
            const queryObj = {
                page: state.page,
                pagesize: state.pagesize,
                sortby: state.sort.sortby,
                sortdirection: state.sort.sortdirection,
            }

            // 遍历filters数组，为查询字符串对象添加查询对象
            for(let i = 0; i < state.filters.length;i++){
                queryObj[state.filters[i].k] = state.filters[i].v
                console.log(queryObj)
            }

            // 请求汽车接口数据
            const URL = process.env.VUE_APP_URL;
            const { page_amount, total, results } = await fetch( URL +'/findcar?' + querystring.stringify(queryObj))
            .then(data=>data.json())

            // 存储结果
            commit('changeResults', { results })
            commit('changeTotal', { total })
            commit('changePageAmount', { page_amount })
        },

        changePage({commit, dispatch, state}, {page}){
            commit('changePage', { page})
            dispatch('init')
        },
        changePageSize({ commit, dispatch, state }, { pagesize }){
            commit('changePage', { page: 1})  //页码归一
            commit('changePageSize', { pagesize})
            dispatch('init')
        },
        changeSort({ commit, dispatch, state }, { key, order }){
            // 改变排序页码要归一
            commit('changeSort', { sortby: key, sortdirection: order == 'asc' ? 1 : -1 })
            commit('changePage', { page: 1 })
            dispatch('init')
        },
        changeFilter({ commit, dispatch, state}, {k , v}){
            // 判断用户的意图是增加、删除、修改？要判断filters中是否已经存在同名的k
            let isExist = false; //filters 默认没有k和v

            // 遍历filters数组，如果结果有k，则修改为true
            state.filters.forEach(item=>{
                if(item.k === k){
                    isExist = true
                }
            })

            // 判断是否存在，如果k不存在，则添加新的k和v到filters过滤器数组中
            if (!isExist){
                commit('addFilter', {k , v})
            }else{
                // 能执行到这，说明filters中有当前选择的k，判断它的v是否不为空，不为空修改v值
                if(v !== ""){
                    commit('updateFilter', {k , v})
                }else{
                    // 如果当前选择的k的v为空，则删除当前筛选条件
                    commit('removeFilter', {k})
                }
            }

            commit('changePage', { page: 1 })
            dispatch('init')
        }
    }
}