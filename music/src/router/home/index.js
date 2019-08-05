import Home from '../../views/home'
export default [
    {
        to:'/',
        exact:true,
        path:"/",
        component:Home,
        context:"音乐馆",
        iconfont:"icon-yinyue",
        children:{

        },
        meta:{
            title:"首页",
            isFooter:true
        },
    }
    // {
    //     to:"/search",
    //     path:"/search",
    //     component:"Search"
    // }
]