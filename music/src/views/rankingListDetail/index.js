import React from "react";
import axios from "axios";
import {
    withRouter
} from "react-router-dom"
class RankingListDetail extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            songList:[],
            topInfo:[],
            id:''
        };
    }
    mvPlayer(id){
        this.props.history.push('/mvplayer/'+id)
    }
    render(){
        // console.log(this.state.songList);
        return(
            <div id={"rankingListDetail"}>
                <p className={"iconfont icon-navbankicon"} onClick={()=>{this.props.history.go(-1)}}></p>
                <div className={"rankingListDetailHead"}>
                    <img id={"rankingListDetailImg"} src={this.state.topInfo.pic_v12} alt=""/>
                    <h3>{this.state.topInfo.ListName}</h3>
                    <p>{this.state.topInfo.ListName}榜  第{this.state.data.day_of_year}天</p>
                    <p style={{color:"#999"}}>更新时间: {this.state.data.update_time}</p>
                </div>
                <p>排行榜 共{this.state.data.total_song_num}首</p>
                <div className={"rankingListDetailList"}>
                    {
                        this.state.songList.map((v,i)=>{
                            // console.log(v)
                            return(
                                <div key={i} className={"songList-list"} >
                                    <p className={"songname"} onClick={()=>this.props.history.push('/songplay/'+v.data.songmid+"/"+v.data.singer[0].name)}><span>{v.cur_count}</span>{v.data.albumname}</p>
                                    {v.data.vid!==""?<i className={"icon iconfont icon-bofang1"}  onClick={this.mvPlayer.bind(this,v.data.vid)}></i>:null}
                                    <p className={"singerall"}>
                                        <b>{v.data.interval}%</b>
                                        {
                                            v.data.singer.map((v,i)=>{
                                                return(
                                                    <span key={i} className={"singer"}>
                                                        {v.name}
                                                    </span>
                                                )
                                            })
                                        }

                                    </p>

                                </div>
                            )
                        })
                    }
                </div>
                <div className={"rankingListDetail_bottom"}>
                    <h4>榜单简介</h4>
                    <div dangerouslySetInnerHTML = {{__html:this.state.topInfo.info}}></div>
                </div>
            </div>
        )
    }
    componentDidMount(topid) {
        axios.get("/qq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&tpl=3&page=detail&type=top",{
            params:{
                topid:this.props.location.state.topid
            }
        })
            .then(({data})=>{
                // console.log(33,this);
                console.log(data);
                this.setState({
                    data:data,
                    songList:data.songlist,
                    topInfo:data.topinfo
                });
                // console.log(this.state.songList);
                console.log(this.state.topInfo);
            })

    }
}
export default withRouter(RankingListDetail);