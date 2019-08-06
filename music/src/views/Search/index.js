import React from 'react';
import axios from "axios";
import {
    withRouter
} from "react-router-dom"
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            getSearchList: [],
            hotSearchList: []
        }
    }

    render() {
        return (
            <div id={"search_main"}>
                <p className={"cancel"} onClick={()=>{this.props.history.go(-1)}}>取消</p>
                <div className={"search"}>
                    <input className={"search_input"} type="search" ref={"search"} placeholder={"搜索歌曲、歌单、专辑"}
                           onKeyPress={this.search.bind(this)}/>
                    <i className={"iconfont icon-RectangleCopy"}></i>
                </div>
                <div>
                    {
                        this.state.getSearchList.map((v, i) => {
                            return (
                                <p key={i} className={"searchList"}>
                                    {v.albumname}
                                </p>
                            )
                        })
                    }
                </div>
                <div>
                    <h5>热门搜索</h5>
                    <div>
                        {
                            this.state.hotSearchList.map((v, i) => {
                                return (
                                    <div key={i} className={"hotSearch"}>
                                        <p>{v.k}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }

    componentWillMount() {
        console.log(11111, this);
        axios.get("/qq/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json")
            .then(({data}) => {
                console.log(data);
                this.setState({
                    hotSearchList: data.data.hotkey
                });
                console.log(this.state.hotSearchList);
            })
    }

    async search() {
        const {data} = await axios.get("/qq/soso/fcgi-bin/client_search_cp?format=json", {
            params: {
                p: 1,
                n: 10,
                w: this.refs.search.value
            }
        });
        console.log(data);
        this.setState({
            getSearchList: data.data.song.list
        })
    }
}
export default withRouter(Search);