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
                icon: 'sell',
                name: 'createPurchase',
                path: '/main/purchase/create'
            },
            {
                label: '采购管理',
                icon: 'sell',
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
                label: '添加销售',
                icon: 'sell',
                name: 'createSales',
                path: '/main/sales/create',
            },
            {
                label: '销售管理',
                icon: 'sell',
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
]