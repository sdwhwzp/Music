import Singer from '../../views/singer'
export default [
    {
        to:"/singer",
        path:"/singer",
        component:Singer,
        context:"",
        meta:{
            title:"歌手",
            isfooter:false
        }
    }
]