import login from '../login'
import My from '../../views/my'
export default [
    {
        to:"/my",
        path:"/my",
        component:My,
        iconfont:"icon-wode",
        context:"我的",
        meta:{
            title:"我的",
            isfooter:true
        },
        children:{
            ...login
        }
    }
]