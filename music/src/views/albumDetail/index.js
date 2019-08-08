import React from 'react';
import axios from 'axios';
import {
    withRouter
}from "react-router-dom"
class AlbumDetail extends React.Component{
    constructor(){
        super();
        this.state={
            slider:[],
            radioList:[],
            data:[]
        }
    }
    render() {
        return (
            <div className={"albumDetail"}>
                    <p className={"iconfont icon-navbankicon"} onClick={()=>{this.props.history.go(-1)}}></p>
                    <img className={"albumDetailHead"} height={'300px'} src={this.state.data.headPic} alt=""/>
            </div>
        )
    }
    componentDidMount() {
        // console.log(11,this.props.location)
        axios.get("/itool/banner",{
            // params:{
            //     slider:this.props.location.state.id
            // }
        })
            .then(({data})=>{
                // console.log(222222,data);
                this.setState({
                    data:data.data
                })
                // console.log(22,this.state)
            })
        axios.get("/qq/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1565236258379&g_tk=1961379485&uin=3103821362&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1")
            .then(({data})=>{
                // console.log(222222,data);
                this.setState({
                    slider:data.data.slider
                })
                console.log(22,this)
            })
        axios.get("/itool/album?id=001W4mXo4Eywps")
            .then(({data})=>{
                console.log(444444,data);
                this.setState({
                    data:data.data.company
                })
                console.log(666,this.state.data);
                // console.log(7,this.state.data.company)
            })
    }
}
export default withRouter(AlbumDetail)