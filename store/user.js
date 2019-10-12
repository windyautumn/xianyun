// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {},
}) 

export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    }
};

export const actions = {};