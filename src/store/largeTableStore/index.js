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

        filters: [],  //存储筛选过滤的条件
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
        }
    },
    actions: {
        async init ({commit, state}){
            // 查询对象
            const queryObj = {
                page: state.page,
                pagesize: state.pagesize,
                sortby: state.sort.sortby,
                sortdirection: state.sort.sortdirection
            }

            // 请求汽车接口数据
            const URL = process.env.VUE_APP_URL;
            const { page_amount, total, results } = await fetch( URL +'/findcar?' + querystring.stringify(queryObj))
            .then(data=>data.json())

            // 存储结果
            commit('changeResults', { results })
            commit('changeTotal', { total })
            commit('changePageAmount', { page_amount })

            console.log(total, results )
        }
    }
}