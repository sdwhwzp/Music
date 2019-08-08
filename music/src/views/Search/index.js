import React from 'react';
import axios from "axios";
import PubSub from 'pubsub-js'
import {
    withRouter
} from "react-router-dom"
import HotSearch from "../hotSearch"
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            getSearchList: [],
            isShow:true,
            click:"97%",
            value:"",
            pageSize:5
        }
    }

    render() {
        return (
            <div id={"search_main"}>
                <p className={"cancel"} onClick={() => {
                    this.props.history.go(-1)
                }}>取消</p>
                <div className={"search"} style={{width:this.state.click}} onClick={()=>this.setState({click:"80%"})}>
                    <input className={"search_input"} type="search" ref={"search"} placeholder={"搜索歌曲、歌单、专辑"}
                           defaultValue={this.state.value}
                           onKeyPress={this.search.bind(this)}
                           onClick={()=>{
                               this.setState({
                                   isShow:!this.state.isShow
                           })
                    }}/>
                    <i className={"iconfont icon-RectangleCopy"}></i>
                </div>
                <div id={"searchResult"}>
                    {
                        this.state.getSearchList.map((v, i) => {
                            return (
                                <div key={i} className={"searchList"}>
                                    <p>{v.albumname}</p>
                                    <p>
                                        {
                                            v.singer.map((v,i)=>{
                                                return(
                                                    <span key={i} className={"singerName"}>{v.name}</span>
                                                )
                                            })
                                        }
                                    </p>
                                </div>
                            )
                        })
                    }
                    <p className={"more"} onClick={this.search.bind(this,++this.state.pageSize)}>点击获取更多搜索结果</p>
                </div>
                {this.state.isShow?<HotSearch {...this.props}></HotSearch>:""}
            </div>
        )
    }
    componentDidMount() {
        console.log(this);
        const me =this;
        PubSub.subscribe('get',function (msg,inputData) {
            console.log(8088,inputData);
            me.setState({
                value:inputData
            })
        })
    }
    async search() {
        const {data} = await axios.get("/qq/soso/fcgi-bin/client_search_cp?format=json", {
            params: {
                p: 1,
                n: this.state.pageSize,
                w: this.refs.search.value
            }
        });
        console.log(data);
        this.setState({
            getSearchList: data.data.song.list
        })
        // console.log(this.state.getSearchList)
        // window.localStorage.searchName=this.state.value;
        // console.log(window.localStorage.searchName);

    }
}

export default withRouter(Search);