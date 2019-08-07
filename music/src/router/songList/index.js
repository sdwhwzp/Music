
import SongList from '../../views/singer/songList'
export default [
    {
        to:"/songlist",
        path:"/songlist/:id/:name",
        component:SongList,
        context:"",
        meta:{
            title:"歌手歌单",
            isFooter:false
        }
    }
]