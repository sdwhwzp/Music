import React from "react";
import axios from "axios";
export default class RankingList extends React.Component{
    constructor(){
        super();
        this.state={
            topList:[],
            songList:[]
        }
    }
    render() {
        return (
            <div className={"rankingList"}>
                排行榜
                {
                    this.state.topList.map((v,i)=>{
                        return(
                            <div key={i} className={"rankingList_list"}>
                                <img src={v.picUrl} alt=""/>
                                <div className={"rankingList_intro"}>
                                    <p className={"topTitle"}>{v.topTitle}</p>
                                    <div>
                                        {
                                            v.songList.map((v,i)=>{
                                                return (
                                                    <p key={i} className={"songList"}>{v.songname}-{v.singername}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        axios.get("/qq/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json")
            .then(({data})=>{
                console.log(data);
                this.setState({
                    topList:data.data.topList
                });
            })
    }
}