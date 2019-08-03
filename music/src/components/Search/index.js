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
                <input width={"200px"} type="search" ref={"search"} placeholder={"搜索歌曲、歌单、专辑"} onKeyPress={this.search.bind(this)} />
                {/*'<i className={"iconfont"}>icon-RectangleCopy</i>'*/}
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
                    <p>热门搜索</p>

                </div>
            </div>
        )
    }
    componentDidMount() {

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
}