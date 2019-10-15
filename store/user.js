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

export const actions = {
    //登录
    async login(store, data){
        var res = await this.$axios({
            url:"/accounts/login",
            method:'POST',
            data
        })
        if(res.status === 200){
            store.commit('setUserInfo',res.data)
        }
        return res
    },
    //手机验证码
    async sendCaptchas(store,tel){
        const res = await this.$axios({
            url:'/captchas',
            method:'POST',
            data:{tel}
        })
        return res
    },
    //注册
    async register(store,data){
        const res = await this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
        })
        if(res.status === 200){
            store.commit('setUserInfo',res.data)
        }
        return res
    }
};