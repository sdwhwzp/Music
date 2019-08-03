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
                <input type="search" ref={"search"} placeholder={"搜索歌曲、歌单、专辑"} onKeyPress={this.search.bind(this)} />
                {
                }
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

    }
}