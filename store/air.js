export const state = () => ({
    // 采用接口返回的数据结构
    history:[]
}) 

export const mutations = {
    setHistory(state,data){
        state.history.unshift(data)
    }
};