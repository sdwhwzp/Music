import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    NavLink,
    withRouter
} from "react-router-dom"
class RankingList extends React.Component{
    constructor(){
        super();
        this.state={
            topList:[]
        }
    }
    render() {
        return (
            <div className={"rankingList"}>
                <p className={"iconfont icon-navbankicon"} onClick={()=>{this.props.history.go(-1)}}></p>
                <div>
                    <h3>巅峰榜</h3>
                </div>
                    {
                        this.state.topList.map((v,i)=>{
                            return(
                                <div key={i} className={"rankingList_list"}>
                                    <img src={v.picUrl} alt="" onClick={()=>{
                                        this.props.history.push({
                                            pathname:"/rankingListDetail",
                                            state:{
                                                topid:v.id
                                            }
                                        })
                                    }}/>
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
        // console.log(22222,this);
        axios.get("/qq/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json")
            .then(({data})=>{
                console.log(5,data);
                this.setState({
                    topList:data.data.topList
                });
            });
    }
}
export default withRouter(RankingList);