import React from "react";
import axios from "axios";
import PubSub from 'pubsub-js'
import {
    withRouter
} from "react-router-dom"
class HotSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            hotSearchList: [],
        }
    }

    emit(k){
        // console.log(k)
        PubSub .publish('get',k)
    }
    render(){
        return(
            <div>
                <h5 className={"hotHead"}>热门搜索</h5>
                <div>
                    {
                        this.state.hotSearchList.map((v, i) => {
                            return (
                                <div key={i} className={"hotSearch"}>
                                    <span ref={"hotSearch"} className={"hotSearch_p"} onClick={this.emit.bind(this,v.k)}>{v.k}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        axios.get("/qq/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json")
            .then(({data}) => {
                // console.log(data);
                this.setState({
                    hotSearchList: data.data.hotkey
                });
                // console.log(this.state.hotSearchList);
            })
    }

}
export default withRouter(HotSearch)