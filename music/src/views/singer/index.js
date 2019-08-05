import "../../index.css"
import React from 'react'
import axios from "axios"
// import Bs from 'better-scroll'
import getState from "../../common/getState"//引入获取state值的函数方法
export default class Singer extends React.Component {
    constructor() {
        super();
        this.state = {
            ListSinger:[],
            nameList:{}
        }
    }
    componentDidMount() {
        axios.get("/qq/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0")
            .then(({data}) => {
                this.setState({
                    ListSinger: data.data.list,
                },()=>{

                    this.setState({
                        nameList:getState(this.state)
                    })
                });//由于getState为异步，不能立刻获取更新之后的值，setState的第二个参数，为回调函数，能够立即获取更新之后的state值
                })




    };
    render(){
        console.log(this.state.nameList,111111111111)
        return(
            <div className={"singer-list"}>
                <div className={'singer-top'} style={{height:"40px",lineHeight:'40px'}}>
                        <span className={"icon iconfont icon-navbankicon"}></span>
                        <span style={{paddingLeft:'147px'}}>歌手</span>
                </div>
                <ol>
                    {
                        Object.keys(this.state.nameList).map((key)=>{//遍历对象方法
                            console.log(this.state.nameList[key],key)
                            return (
                                <li  key={key}>
                                    <div className={"indexname"}>{key}</div>
                                    <ul>
                                        {
                                            this.state.nameList[key].map((v,i)=>{
                                           return(
                                               <li key={i}>
                                                   <img src={v.avator} alt=""/>
                                                   <span>{v.Fsinger_name}</span>
                                               </li>
                                           )
                                        })
                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        )
    }


}
