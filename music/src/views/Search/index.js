import React from 'react';
import axios from "axios";
import PubSub from 'pubsub-js'
import {
    withRouter
} from "react-router-dom"
import HotSearch from "../hotSearch"
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getSearchList: [],
            isShow: true,
            click: "97%",
            value: "",
            pageIndex:1,
            pageSize: 15,
            display: "none"
        }
    }

    render() {
        return (
            <div id={"search_main"}>
                <p className={"cancel"} onClick={() => {
                    this.props.history.go(-1)
                }}>取消</p>
                <div className={"search"} style={{width: this.state.click}}
                     onClick={() => this.setState({click: "80%"})}>
                    <input className={"search_input"} type="text" ref={"search"} placeholder={"搜索歌曲、歌单、专辑"}
                           defaultValue={this.state.value}
                           onKeyUp={this.search.bind(this)}
                           onClick={() => {
                               this.setState({
                                   isShow: false
                               })
                           }}/>
                    <i className={"iconfont icon-RectangleCopy"}></i>
                </div>
                <div id={"searchResult"} style={{display: this.state.display}}>
                    {
                        this.state.getSearchList.map((v, i) => {
                            return (
                                <div key={i} className={"searchList"} onClick={() => {
                                    this.props.history.push("/songplay/" + v.songmid + "/" + v.singer[0].name)
                                }}>
                                    <p>{v.albumname}</p>
                                    <p>
                                        {
                                            v.singer.map((v, i) => {
                                                return (
                                                    <span key={i} className={"singerName"}>{v.name}</span>
                                                )
                                            })
                                        }
                                    </p>
                                </div>
                            )
                        })
                    }
                    {this.state.getSearchList.length > 0 ? <p className={"more"} onClick={this.search.bind(this, ++this.state.pageIndex)}>点击获取更多搜索结果</p> : ""}
                </div>
                {this.state.isShow ? <HotSearch {...this.props}></HotSearch> : ""}
            </div>
        )
    }

    componentDidMount() {
        // console.log(111,this);
        const me = this;
        PubSub.subscribe('get', function (msg, inputData) {
            // console.log(8088, inputData);
            me.setState({
                value: inputData
            })
        })
    }

    async search() {
        const {data} = await axios.get("/qq/soso/fcgi-bin/client_search_cp?format=json", {
            params: {
                p:this.state.pageIndex,
                n: this.state.pageSize,
                w: this.refs.search.value
            }
        });
        // console.log(data);
        this.setState({
            getSearchList: data.data.song.list,
            display: "block"
        })
        // console.log(this.state.getSearchList)

    }
}
export default withRouter(Search);