// eslint-disable-next-line no-unused-vars
import dateFormat from 'dateformat'
export default{
    state: {
        // currentDate:dateFormat(new Date(), 'yyyy-mm-dd H:MM:ss' ),
        currentDate:'',
    },
    mutations: {
        refreshTime(state,payload){
            state.currentDate=payload.currentTime;
        }
    },
    actions: {
        // refreshTime(context,payload){
        //     return new Promise(((resolve) => {
        //         setTimeout(()=>{
        //             context.commit('edit',payload)
        //             resolve()
        //         },1000)
        //     }))
        // }
    }
}