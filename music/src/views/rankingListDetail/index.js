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
            topInfo:""
        }
    }
    render(){
        return(
            <div>排行榜详情
                <p>
                    {/*{*/}
                    {/*    this.state.topInfo.map((item)=>{*/}
                    {/*        return(*/}
                    {/*            <div>{item.Listname}</div>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </p>
                {
                    this.state.songList.map((v,i)=>{
                        return(
                            <div key={i}>{v.data.albumname}</div>
                        )
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        axios.get("/qq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&tpl=3&page=detail&type=top&topid=4")
            .then(({data})=>{
                console.log(data);
                this.setState({
                    songList:data.songlist,
                    topInfo:data.topinfo
                });
                console.log(this.state.songList);
                console.log(this.state.topInfo);
            })
    }
}
export default withRouter(RankingListDetail);