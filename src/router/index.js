import Vue from 'vue'
import VueRouter from 'vue-router'
// import Qs from 'qs'
// import axios from 'axios'

import store from "@/store";

import NotFount from '@/views/404'
import Main from '@/views/Main'
import Begin from '@/views/Begin'

import Home from '@/components/main/home/Home'
import createPurchase from '@/components/main/purchase/createPurchase'
import managePurchase from '@/components/main/purchase/managePurchase'

import account from '@/components/main/account/account'

import createSales from '@/components/main/sales/createSales'
import manageSales from '@/components/main/sales/manageSales'

import manageCommodity from '@/components/main/commodity/manageCommodity'
import manageStock from '@/components/main/stock/manageStock'

import countPurchase from "@/components/main/count/countPurchase";
import countSales from "@/components/main/count/countSales";
import countStock from "@/components/main/count/countStock";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect(){
            return '/begin'
        },},{
      path: '/begin',
      name: 'Begin',
      component: Begin,
    },{
        path: '/main',
        name: 'Main',
        component: Main,
    redirect() {
        return "/main/home";
    },
    children:[{
            index:1,
            path:"/main/home",
            name:'home',
            component:Home,
            meta:{
                keepAlive:false,
            },
        },{
            index:2,
            path:"/main/purchase/create",
            name:'createPurchase',
            component:createPurchase,
            meta:{
                keepAlive:true,
            },
        },{
            index:3,
            path:"/main/purchase/manage",
            name:'managePurchase',
            component:managePurchase,
            meta:{
                keepAlive:true,
            },
        },{
            index:4,
            path:"/main/sales/create",
            name:'createSales',
            component:createSales,
            meta:{
                keepAlive:true,
            },
        },{
            index:5,
            path:"/main/sales/manage",
            name:'manageSales',
            component:manageSales,
            meta:{
                keepAlive:true,
            },
        },{
            index:6,
            path:"/main/stock/manage",
            name:'manageStock',
            component:manageStock,
                meta:{
                    keepAlive:true,
                },
        },{
            index:7,
            path:"/main/commodity/manage",
            name:'manageCommodity',
            component:manageCommodity,
            meta:{
                keepAlive:true,
            },
        },{
            index:8,
            path:"/main/account/manage",
            name:'account',
            component:account,
            meta:{
                keepAlive:true,
            },
        },{
            index:9,
            path:"/main/count/purchase",
            name:'????????????',
            component:countPurchase,
            meta:{
                keepAlive:true,
            },
        },{
            index:10,
            path:"/main/count/sales",
            name:'????????????',
            component:countSales,
            meta:{
                keepAlive:true,
            },
        },{
            path:"/main/count/stock",
            name:'????????????',
            component:countStock,
            index:11,
            meta:{
                keepAlive:true,
            },
        },]
    },{
        path: '*',
        component: NotFount
        }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}


router.beforeEach((to,from,next)=>{
    // let state
    // axios.get("/user/verify")
    //     .then((response)=>{
    //         state= response.data["state"];
    //         console.log("state: "+state)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // if(to.path==='/begin'||to.path==="/"){
    //     next()
    // }else if(state==='true') {
    //     next()
    // }else {
    //     next()
    // }

    if(to.path==='/begin'||to.path==="/"){
        next()
    }else if(store.state.user.userId===''||store.state.user.userName==='') {
        next("/begin")
    }else {
        next()
    }
})


export default router
