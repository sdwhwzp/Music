import React from 'react';
import axios from "axios";
export default class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            getSearchList:[],
            hotSearchList:[]
        }
    }
    render(){
        return(
            <div>
                <div>
                    <input type="search" ref={"search"} placeholder={"搜索歌曲、歌单、专辑"} onKeyPress={this.search.bind(this)} />
                    <i className={"iconfont icon-RectangleCopy"}></i>
                </div>
                {
                    this.state.getSearchList.map((v,i)=>{
                        return(
                            <div key={i}>
                                <p>{v.albumname}</p>
                            </div>
                        )
                    })
                }
                <div>
                    热门搜索
                    {/*{*/}
                    {/*    this.state.hotSearchList.map((v,i)=>{*/}
                    {/*        return(*/}
                    {/*            <div key={i}>*/}
                    {/*                <div>{v.k}</div>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </div>

            </div>
        )
    }
    componentWillMount() {
        console.log(11111,this);
        this.hotSearch();
    }

    async search(){
        const {data} = await axios.get("/qq/soso/fcgi-bin/client_search_cp?format=json",{
            params:{
                p:1,
                n:10,
                w:this.refs.search.value
            }
        });
        console.log(data);
        this.setState({
            getSearchList:data.data.song.list
        })
    }
    async hotSearch(){
        const {data} = await axios.get("/qq/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json");
        console.log(data);
        this.setState({
            hotSearchList:data.data.hotkey.k
        })
    }
}