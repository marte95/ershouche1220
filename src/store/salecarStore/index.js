export default {
    namespaced: true,
    state: {
        step: 1
    },
    mutations: {
        changeStep(state, {step}){
            state.step = step
        }
    }
}