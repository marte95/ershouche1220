import axios from "axios";

export default {
    namespaced: true,
    state: {
        login:'',
        username: '',
        nickname:'',
        avatar:'',
        mobile:'',
        sex:''
    },
    mutations: {
        changeLogin(state, { login}){
            state.login = login
        },
        changeUsername(state, { username }) {
            state.username = username
        },
        changeNickname(state, { nickname }) {
            state.nickname = nickname
        },
        changeAvatar(state, { avatar }) {
            state.avatar = avatar
        },
        changeMobile(state, { mobile }) {
            state.mobile = mobile
        },
        changeSex(state, { sex }) {
            state.sex = sex
        },
    },
    actions: {
        async fetchUserInfo({commit}){
            const token = localStorage.getItem('token');
            const { login, username, nickname, avatar, mobile, sex } = await axios.get('/api/userinfo?token=' + token).then(res=>res.data)

            commit('changeLogin', { login })
            commit('changeUsername', { username })
            commit('changeNickname', { nickname })
            commit('changeAvatar', { avatar })
            commit('changeMobile', { mobile })
            commit('changeSex', { sex })
        }
    }
}