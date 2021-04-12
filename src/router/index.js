import Vue from 'vue'
import VueRouter from 'vue-router'

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
        children:[{
            index:1,
            path:"/main/home",
            name:'初始页',
            component:Home,
            meta:{
                keepAlive:false,
            },
        },{
            index:2,
            path:"/main/purchase/create",
            name:'创建采购订单',
            component:createPurchase,
            meta:{
                keepAlive:true,
            },
        },{
            index:3,
            path:"/main/purchase/manage",
            name:'采购订单管理',
            component:managePurchase,
            meta:{
                keepAlive:true,
            },
        },{
            index:4,
            path:"/main/sales/create",
            name:'创建销售订单',
            component:createSales,
            meta:{
                keepAlive:true,
            },
        },{
            index:5,
            path:"/main/sales/manage",
            name:'销售订单管理',
            component:manageSales,
            meta:{
                keepAlive:true,
            },
        },{
            index:6,
            path:"/main/stock/manage",
            name:'库存管理',
            component:manageStock,
                meta:{
                    keepAlive:true,
                },
        },{
            index:7,
            path:"/main/commodity/manage",
            name:'商品管理',
            component:manageCommodity,
            meta:{
                keepAlive:true,
            },
        },{
            index:8,
            path:"/main/account/manage",
            name:'帐号管理',
            component:account,
            meta:{
                keepAlive:true,
            },
        },{
            index:9,
            path:"/main/count/purchase",
            name:'采购统计',
            component:countPurchase,
            meta:{
                keepAlive:true,
            },
        },{
            index:10,
            path:"/main/count/sales",
            name:'销售统计',
            component:countSales,
            meta:{
                keepAlive:true,
            },
        },{
            path:"/main/count/stock",
            name:'库存统计',
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
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}


router.beforeEach((to,from,next)=>{

    if(to.path==='/begin'||to.path==="/"){
        next()
    }else if(store.state.user.userId===''||store.state.user.userName==='') {
        next("/begin")
    }else {
        next()
    }
})
// router.afterEach((to)=>{
//     if(to.path==='/*'){
//         location.reload()
//     }
// })


export default router
