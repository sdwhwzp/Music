import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    NavLink,
    withRouter
} from "react-router-dom"
class Album extends React.Component{
    constructor(props){
        super(props);
        this.state={
            albumlist:[],
            slider:[],
            data:[]

        }
    }
    render() {
        return (
            <div className={"album"}>
                <div>
                    <p className={"iconfont icon-navbankicon"} onClick={()=>{this.props.history.go(-1)}}></p>
                </div>
                {
                    this.state.slider.map((v,i)=>{
                        return(
                            <div className={"albumBanner"} key={i}>
                                <div  className={"swiper-slide"} key={v.id}>
                                    <img width={"100%"} src={v.picUrl} onClick={()=>{
                                        this.props.history.push({
                                            pathname:"/albumDetail",
                                            state:{
                                                slider:v.id
                                            }
                                        })
                                    }} alt=""/>
                                    <a className={"albumName"} href="" alt="">
                                        {/*{*/}
                                        {/*    this.state.albumlist.map((v,i)=>{*/}
                                        {/*        return(*/}
                                        {/*            <div key={i}>*/}
                                        {/*                {v.album_name}*/}
                                        {/*            </div>*/}
                                        {/*        )*/}
                                        {/*    })*/}
                                        {/*}*/}
                                        {/*{this.state.data.company.name}*/}
                                    <p className={"albumTitle"}>{this.state.data.Falbum_desc}</p>/\
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        axios.get("/qq/v8/fcg-bin/album_library?format=json&cmd=firstpage&page=0&pagesize=20&sort=1&language=-1&genre=0&year=1&pay=0&type=-1&company=-1")
            .then(({data})=>{
                console.log(88888,data);
                this.setState({
                    data:data,
                    albumlist:data.data.albumlist
                });
            });
        axios.get("/qq/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?&format=json")
            .then(({data})=>{
                console.log(2,data)
                this.setState({
                    slider:data.data.slider
                })
            })
        axios.get("/itool/album?id=001W4mXo4Eywps")
            .then(({data})=>{
                // console.log(1,data);
                this.setState({
                    data:data.data
                })
            })
    }
}
export default withRouter(Album);