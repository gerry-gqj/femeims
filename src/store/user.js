export default {
    state:{
        //存放的键值对就是所要管理的状态
        userId:'',
        userName:'',
        position:'',
    },
    mutations:{
        edit(state,payload){
            state.userId=payload.userId
            state.userName=payload.userName
            state.position=payload.position
            console.log('edit'+payload.userId,payload.userName,payload.position)
        },
        clearUser(state){
            state.userId=''
            state.userName=''
            state.position=''
            console.log(state.userId,state.userName,state.position)
        }
    }
}