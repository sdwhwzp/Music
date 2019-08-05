import Home from '../../views/home'
import RankingList from "../../views/rankingList"
import Search from "../../views/Search";
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
    },
    {
        to:"/search",
        path:"/search",
        component:Search,
        meta:{
            title:"搜索",
            isFooter:false
        }
    },
    {
        to:"/rankingList",
        path:"/rankingList",
        component:RankingList,
        meta:{
            title:"排行榜",
            isFooter:false
        }
    }
]