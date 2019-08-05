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
    }


]