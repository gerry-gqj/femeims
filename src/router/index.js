import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "@/store";

import NotFount from '@/views/404'
import Main from '@/views/Main'
import Begin from '@/views/Begin'

import Home from '@/components/main/Home'
import createPurchase from '@/components/main/purchase/createPurchase'
import managePurchase from '@/components/main/purchase/managePurchase'
import createSales from '@/components/main/sales/createSales'
import manageSales from '@/components/main/sales/manageSales'
import manageCommodity from '@/components/main/commodity/manageCommodity'
import manageStock from '@/components/main/stock/manageStock'
import account from '@/components/main/account/account'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect(){
            return '/begin'
        }
    }, {
      path: '/begin',
      name: 'Begin',
      component: Begin,
    }, {
        path: '/main',
        name: 'Main',
        component: Main,
        children:[{
              path:"/main/home",
              name:'欢迎页',
              component:Home,
              index:1,
            },{
              path:"/main/purchase/create",
              name:'创建采购订单',
              component:createPurchase,
              index:2,
            },{
              path:"/main/purchase/manage",
              name:'采购订单管理',
              component:managePurchase,
              index:3,
            },{
              path:"/main/sales/create",
              name:'创建销售订单',
              component:createSales,
              index:4,
            },{
              path:"/main/sales/manage",
              name:'销售订单管理',
              component:manageSales,
              index:5,
            },{
              path:"/main/stock/manage",
              name:'库存管理',
              component:manageStock,
              index:6,
            },{
              path:"/main/commodity/manage",
              name:'商品管理',
              component:manageCommodity,
              index:7,
            },{
              path:"/main/account/manage",
              name:'帐号管理',
              component:account,
              index:8,
            },
        ]
  },{
    path: '*',
    component: NotFount
  }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{

    if(to.path==='/begin'||to.path==="/"){
        next()
    }else if(store.state.userId===''||store.state.userName==='') {
        next("/begin")
    }else {
        next()
    }
})

export default router
