module.exports=[
    {
        label:'首页',
        name:'home',
        path:'/main/home',
        icon:'s-home',
    },
    {
        label:'采购订单',
        icon:'sold-out',
        children:[
            {
                label: '添加采购',
                icon:'user-solid',
                name: 'createPurchase',
                path: '/main/purchase/create'
            },
            {
                label: '采购管理',
                icon:'solid',
                name: 'managePurchase',
                path: '/main/purchase/manage',
            }
        ]
    },
    {
        label: '销售订单',
        icon: 'sell',
        children: [
            {
                label: '创建销售',
                icon:'user-solid',
                name: 'createSales',
                path: '/main/sales/create',
            },
            {
                label: '销售管理',
                icon:'user',
                name: 'manageSales',
                path: '/main/sales/manage',
            }
        ]
    },
    {
        label: '库存管理',
        icon:'coin',
        name: 'manageStock',
        path: '/main/stock/manage',
    },
    {
        label: '商品管理',
        icon:'document-checked',
        name: 'manageStock',
        path: '/main/commodity/manage',
    },
    {
        label: '帐号管理',
        icon:'user',
        name: 'account',
        path: '/main/account/manage',
    },
]



//
//     <el-menu
// default-active=""
// class="el-menu-vertical-demo"
// @open="handleOpen"
// @close="handleClose"
// router
// background-color="#24262F"
// text-color="#fff"
// active-text-color="#ffd04b" style="width: 210px;height: 100%">
//     <el-submenu index="1">
//     <template slot="title">
//     <i class="el-icon-sold-out"></i>
// <span>采购订单</span>
// </template>
// <el-menu-item index="/main/purchase/create">
// <i class="el-icon-document-add"></i>
// <span>创建订单</span>
// </el-menu-item>
// <el-menu-item index="/main/purchase/manage">
// <i class="el-icon-document-checked"></i>
// <span>订单管理</span>
// </el-menu-item>
// </el-submenu>
//
// <el-submenu index="2">
// <template slot="title">
// <i class="el-icon-sell"></i>
// <span>销售订单</span>
// </template>
// <el-menu-item index="/main/sales/create">
// <i class="el-icon-document-add"></i>
// <span>创建订单</span>
// </el-menu-item>
// <el-menu-item index="/main/sales/manage">
// <i class="el-icon-document-checked"></i>
// <span>订单管理</span>
// </el-menu-item>
// </el-submenu>
//
// <el-submenu index="3">
// <template slot="title">
// <i class="el-icon-goods"></i>
// <span>商品</span>
// </template>
// <el-menu-item index="/main/commodity/manage">
// <i class="el-icon-document-checked"></i>
// <span>商品管理</span>
// </el-menu-item>
// </el-submenu>
//
// <el-submenu index="4">
// <template slot="title">
// <i class="el-icon-coin"></i>
// <span>库存单</span>
// </template>
// <el-menu-item index="/main/stock/manage">
// <i class="el-icon-document-checked"></i>
// <span>库存管理</span>
// </el-menu-item>
// </el-submenu>
//
// <el-submenu index="5">
// <template slot="title">
// <i class="el-icon-s-data"></i>
// <span>数据统计</span>
// </template>
// <el-menu-item index="/main/count/purchase">
// <i class="el-icon-document-checked"></i>
// <span>采购统计</span>
// </el-menu-item>
// <el-menu-item index="/main/count/sales">
// <i class="el-icon-document-checked"></i>
// <span>销售统计</span>
// </el-menu-item>
// <el-menu-item index="/main/count/stock">
// <i class="el-icon-document-checked"></i>
// <span>库存统计</span>
// </el-menu-item>
// </el-submenu>
//
// <el-menu-item index="/main/account/manage" v-if="this.$store.state.position==='系统管理员'">
// <i class="el-icon-user"></i>
// <span>帐号管理</span>
// </el-menu-item>
// </el-menu>
