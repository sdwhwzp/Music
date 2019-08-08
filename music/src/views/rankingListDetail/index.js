import React from "react";
import axios from "axios";
import {
    withRouter
} from "react-router-dom"
class RankingListDetail extends React.Component{
    constructor(){
        super();
        this.state={
            songList:[],
            topInfo:[],
            id:''
        };

    }
    mvPlayer(id){
        this.props.history.push('/mvplayer/'+id)
    }
    render(){
        return(
            <div id={"rankingListDetail"}>
                <p className={"iconfont icon-navbankicon"} onClick={()=>{this.props.history.go(-1)}}></p>
                <div className={"rankingListDetailHead"}>
                    <img id={"rankingListDetailImg"} src={this.state.topInfo.pic_v12} alt=""/>
                    <p>{this.state.topInfo.ListName}</p>
                </div>
                <div className={"rankingListDetailList"}>
                    {
                        this.state.songList.map((v,i)=>{
                            console.log(v)
                            return(
                                <div key={i} className={"songList-list"}>
                                    <p className={"songname"}><span>{v.cur_count}</span>{v.data.albumname}</p>
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
                <div>
                    <h5>榜单简介</h5>
                    <p>{this.state.topInfo.info}</p>
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
                // console.log(data);
                this.setState({
                    songList:data.songlist,
                    topInfo:data.topinfo
                });
                // console.log(this.state.songList);
                // console.log(this.state.topInfo);
            })
    }
}
export default withRouter(RankingListDetail);