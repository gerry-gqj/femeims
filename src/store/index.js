import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tag'
import user from './user'
import createPersistedState from "vuex-persistedstate"

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    modules:{
        tab,
        user,
    },
})