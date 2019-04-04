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
    }
}