import React from 'react'
import Url from '../../../common/img'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import BS from 'better-scroll'
class SongList extends React.Component{
    constructor(){
        super()
        this.state={
            songList:[],
            sel:-1,
        }
    }
    componentDidMount(){
        const mid=this.props.match.params.id
        axios.get(`/qq/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${mid}`)
         .then(({data}) => {
                let list=[]
                for (let index=0; index < data.data.list.length; index++) {
                    let {albumname,songname,songmid}=data.data.list[index].musicData
                    let vid=data.data.list[index].vid
                    list.push({albumname,songname,songmid,vid})
                }
             this.setState({
                 songList:list
             })
            })
        this.scroll = new BS(".list-wrapper",{click:true,probeType:3})
        let img=this.refs.img
        let imgH=img.clientHeight
        let style = null

        this.scroll.on('scroll',({y})=>{
            if(this.refs.shadow){
                let shadow=this.refs.shadow
                let distence = Math.max(y,-imgH+40)
                if(y<=-imgH+40){
                    img.style.zIndex=1
                    img.style.height='60px'
                }else {
                    img.style.zIndex=0
                    img.style.height=imgH+"px"
                }
                let precent = 1+(y/imgH)
                if(y>=0){
                    img.style.transform=`scale(${precent})`
                }
                shadow.style=`transform:translate3d(0,${distence}px,0)`
            }
        })

        let name=localStorage.getItem("class")
        this.setState({
            sel:name
        })

    };
    goBack(){
        this.props.history.go(-1)
    }
    song(v,key){
        localStorage.setItem("class",JSON.stringify(key))
        let name=localStorage.getItem("class")
        this.setState({
            sel:name
        })

        this.props.history.push({
            pathname: `/songplay/${v.songmid}`,

        })
    }
    play(obj){
        this.props.history.push(`/mvplayer/${obj.Fvid}`)
    }
    render(){

        return(
            <div className={"song"}>
                {
                    <div >
                        <div className={"header"}>
                            <span className={"icon iconfont icon-navbankicon"} onClick={this.goBack.bind(this)}></span>
                            <h4>{this.props.match.params.name}</h4>
                        </div>
                        <div className={"img"} ref={"img"} style={{backgroundImage:`url(${ Url(this.props.match.params.id)})`}}>
                            {/*<img  src={Url(this.props.match.params.id)} alt=""/>*/}
                        </div>
                        <div className={"shadow"} ref={"shadow"}> </div>
                        <div className={"list-wrapper"}>
                            <ul>
                                <li className={"icon iconfont icon-bofang"} style={{color:"green"}}> 全部播放({this.state.songList.length})</li>
                                {
                                    this.state.songList.map((v,i)=>{
                                        return(

                                            <li key={i} className={i==this.state.sel?'sel':""} >
                                                <h1 ref={i} onClick={this.song.bind(this,v,i)}>{v.songname}</h1>
                                                <p><span>{this.props.match.params.name}</span>  ·  <span>{v.albumname}</span></p>
                                                <p className={v.vid!==null&&v.vid.Fstatus!==null?"icon iconfont icon-bofang1":''} id={"iconfont"} onClick={this.play.bind(this,v.vid)}></p>
                                            </li>
                                        )
                                    })
                               }
                            </ul>
                        </div>
                    </div>


                }
            </div>
        )
    }
}
export default withRouter(SongList)