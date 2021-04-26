export default{
    state: {
        currentMenu:null,
        isCollapse: false,
        tabsList:[
            {
                path:"/main/home",
                name:"home",
                label:"首页",
                icon:"home"
            }
        ]
    },
    mutations: {
        selectMenu(state,val){
            if(val.name!=='home'){
                state.currentMenu=val;
                let result=state.tabsList.findIndex(item=>item.name===val.name);
                result===-1 ? state.tabsList.push(val) : ''
            }else{
                state.currentMenu=null
            }
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        closeTab(state,val){
            let result=state.tabsList.findIndex(item=>item.name===val.name);
            state.tabsList.splice(result,1);
        },
        clearTab(state){
            state.tabsList=[
                {
                    path:"/main/home",
                    name:"home",
                    label:"首页",
                    icon:"home"
                }
            ]
        }
    },
}