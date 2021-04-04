import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],

    state:{
        //存放的键值对就是所要管理的状态
        userId:'',
        userName:'',
        position:'',

    },
    mutations:{
        edit(state,payload){
            state.userId=payload.userId;
            state.userName=payload.userName;
            state.position=payload.position;
            console.log(payload.userId,payload.userName,payload.position)
        },
        clear(state){
            state.userId='',
            state.userName='',
            state.position=''
            console.log(state.userId,state.userName,state.position)
        }
    }
})

export default store