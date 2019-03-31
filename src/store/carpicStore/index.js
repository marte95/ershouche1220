export default {
    namespaced: true,
    state: {
        id: 0,
        nowAlbum: 'view',
        nowIdx: 0,
        result: {}  //请求某辆车的数据结果（来自于服务器）
    },
    mutations: {
        // 修改当前显示的车辆id
        changeId(state, { id }){
            state.id = id
        },
        // 存储请求回来的result结果
        changeResult(state, { result }) {
            state.result = result
        },
        changeNowAlbum(state, { nowAlbum }){
            state.nowAlbum = nowAlbum;
        },
        changeNowIdx(state, { nowIdx }) {
            state.nowIdx = nowIdx;
        }
    },
    actions: {
        async init({commit}, { id }){
            // 请求后端车辆数据接口，接口已经实现CORS跨域
            const { result } = await fetch(process.env.VUE_APP_URL + '/car/' + id)
            .then(data=>data.json())

            // 拿到服务器返回的数据后，存储到store中
            commit('changeResult', { result })
            // 修改当前显示的车辆id
            commit('changeId', { id })

            // 默认切换view图集
            commit('changeNowAlbum', { nowAlbum: 'view'})
            // 当前图片编号归0
            commit('changeNowIdx', { nowIdx: 0})
        },

        // 改变当前图集
        changeNowAlbum({ commit }, { nowAlbum }) {
            // 切换图集
            commit('changeNowAlbum', { nowAlbum })
            commit('changeNowIdx', { nowIdx: 0 })
        },

        goNext({commit ,state}){
            if(state.nowIdx < state.result.images[state.nowAlbum].length-1){
                commit('changeNowIdx', { nowIdx: state.nowIdx + 1 })
            } else {
                // nowIdx是当前每个图集的图片编号，每次切换图集都必须归0
                commit('changeNowIdx', { nowIdx: 0 })
                // 判断当前图集
                switch(state.nowAlbum){
                    case 'view': 
                        commit('changeNowAlbum', { nowAlbum:'inner' })
                        break;
                    case 'inner':
                        commit('changeNowAlbum', { nowAlbum: 'engine' })
                        break;
                    case 'engine': 
                        commit('changeNowAlbum', { nowAlbum:'more' })
                        break;
                    case 'more':
                        commit('changeNowAlbum', { nowAlbum: 'view' })
                        break;
                }
            }
        },
        goPrev({ commit, state }) {
            if (state.nowIdx > 0) {
                commit('changeNowIdx', { nowIdx: state.nowIdx - 1 })
            } else {
                // 判断当前图集
                // switch (state.nowAlbum) {
                //     case 'view':
                //         commit('changeNowAlbum', { nowAlbum: 'more' })
                //         break;
                //     case 'more':
                //         commit('changeNowAlbum', { nowAlbum: 'engine' })
                //         break;
                //     case 'engine':
                //         commit('changeNowAlbum', { nowAlbum: 'inner' })
                //         break;
                //     case 'inner':
                //         commit('changeNowAlbum', { nowAlbum: 'view' })
                //         break;
                // }

                var arr = ['view', 'inner', 'engine', 'more'];
                // 检查数组中是否存在某项，存在返回当前项下标
                var index = arr.indexOf(state.nowAlbum)
                // 切换数组中的图集类型
                index = index <= 0 ? 3 : index - 1
                // 根据下标选择数组中的图集类型
                var nowAlbum = arr[index]
                // 改变
                commit('changeNowAlbum', { nowAlbum })
                
                // nowIdx是当前每个图集的图片编号，每次切换图集都必须归0
                commit('changeNowIdx', { nowIdx: state.result.images[state.nowAlbum].length - 1 })
            }
        }
    }
}