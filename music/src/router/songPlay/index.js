import SongPlay from '../../views/songPlay'
export default [
    {
        to:"/songplay",
        path:"/songplay/:id",
        component:SongPlay,
        context:"",
        meta:{
            title:"歌曲播放",
            isFooter:false
        }
    }
]