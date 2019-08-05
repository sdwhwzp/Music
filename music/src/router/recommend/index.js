import  Recommend from '../../views/recommend'
export default [
    {
        to:'/recommend',
        path:'/recommend',
        context:"推荐",
        iconfont:"icon-xingxing",
        component:Recommend,
        children:{
        },
        meta:{
            title:"推荐",
            isFooter:true
        }
    }

]