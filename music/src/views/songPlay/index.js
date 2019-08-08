import React from "react"
import {withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'
import axios from 'axios'
import getVid from "../../common/getVid/index";
class SongPlay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            singer:this.props.match.params.name,
            name:null,
            song:null,
            pic:null,
            sel:0,
            getVid:[],
            change:0
        }
    }
    componentDidMount(){
        axios.get(`/itool/song?id=${this.state.id}`)//获取歌手名字
            .then(({data}) => {
                this.setState({
                    name:data.data[0].name
                })
            })
        axios.get(`/itool/url?id=${this.state.id}&quality=128&isRedirect=0`)//获取歌曲播放地址
            .then(({data}) => {
                this.setState({
                    song:data.data
                })
            })
        axios.get(`/itool/lrc?id=${this.state.id}`)//获取歌词
            .then((data) => {
                console.log(data)
            })
        axios.get(`/itool/pic?id=${this.state.id}&isRedirect=0`)//获取歌曲图片地址
            .then(({data}) => {
                this.setState({
                    pic:data.data
                })
            })
        const img = document.getElementById("img")
        let height=0
        setTimeout(()=>{
           height=img.clientHeight
            if(height===0){
                this.setState({
                    pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565266541929&di=e3a4fcc9c38929f3487d2ba20c3c99df&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F07%2F06%2F0b41b16374067d51821b4c6b961e0592.jpg'
                })
                img.style.width='300px'
                img.style.height='300px'
            }
        },1000)
        this.setState({
            getVid:JSON.parse(localStorage.getItem("getVid"))
        })

    }
    jump(type){

        if(type==='next'){
            this.state.getVid.map((v,i)=>{
                if(this.state.id===v){
                        if(i+1>this.state.getVid.length-1){
                            i=0
                            let newId=this.state.getVid[i]
                        }
                    let newId=this.state.getVid[i+1]
                    this.setState({
                        id:newId
                    },()=>{
                        axios.get(`/itool/song?id=${this.state.id}`)//获取歌手名字
                            .then(({data}) => {
                                this.setState({
                                    name:data.data[0].name
                                })
                            })
                        axios.get(`/itool/url?id=${this.state.id}&quality=128&isRedirect=0`)//获取歌曲播放地址
                            .then(({data}) => {
                                this.setState({
                                    song:data.data
                                })
                            })
                        axios.get(`/itool/lrc?id=${this.state.id}`)//获取歌词
                            .then((data) => {
                                console.log(data)
                            })
                        axios.get(`/itool/pic?id=${this.state.id}&isRedirect=0`)//获取歌曲图片地址
                            .then(({data}) => {
                                this.setState({
                                    pic:data.data
                                })
                            })
                    })
                }
            })
            const img = document.getElementById("img")
            let height=0
            setTimeout(()=>{
                height=img.clientHeight
                if(height===0){
                    this.setState({
                        pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565266541929&di=e3a4fcc9c38929f3487d2ba20c3c99df&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F07%2F06%2F0b41b16374067d51821b4c6b961e0592.jpg'
                    })
                    img.style.width='300px'
                    img.style.height='300px'
                }
            },1000)

        }else {
            this.state.getVid.map((v, i) => {
                if (this.state.id === v) {
                    if (i - 1 < 0) {
                        i = this.state.getVid.length - 1
                        let newId = this.state.getVid[i]
                    }
                    let newId = this.state.getVid[i - 1]

                    this.setState({
                        id: newId
                    }, () => {
                        axios.get(`/itool/song?id=${this.state.id}`)//获取歌手名字
                            .then(({data}) => {
                                this.setState({
                                    name: data.data[0].name
                                })
                            })
                        axios.get(`/itool/url?id=${this.state.id}&quality=128&isRedirect=0`)//获取歌曲播放地址
                            .then(({data}) => {
                                this.setState({
                                    song: data.data
                                })
                            })
                        axios.get(`/itool/lrc?id=${this.state.id}`)//获取歌词
                            .then((data) => {
                                console.log(data)
                            })
                        axios.get(`/itool/pic?id=${this.state.id}&isRedirect=0`)//获取歌曲图片地址
                            .then(({data}) => {
                                this.setState({
                                    pic: data.data
                                })
                            })
                    })
                }
            })
            const img = document.getElementById("img")
            let height = 0
            setTimeout(() => {
                height = img.clientHeight
                if (height === 0) {
                    this.setState({
                        pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565266541929&di=e3a4fcc9c38929f3487d2ba20c3c99df&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F07%2F06%2F0b41b16374067d51821b4c6b961e0592.jpg'
                    })
                    img.style.width = '300px'
                    img.style.height = '300px'
                }
            }, 1000)
        }


    }

    play(){
        let audio=this.refs.audio
        console.log(audio.__proto__)
        if(audio.paused){
            audio.play()
            this.setState({
                change:0
            })
        }else{
            audio.pause()
            this.setState({
                change:1
            })
        }
    }
    render(){
        return(
            <div className={"song-play"}>
                <div className={'song-header'}>
                    <p style={{textAlign:'center',height:'30px',lineHeight:'30px',fontSize:'18px'}}><span id={'song-back'} className={'icon iconfont icon-xiangxiadejiantou'} style={{position:"fixed",left:"15px"}} onClick={()=>{this.props.history.go(-1)}}></span>{this.state.name}</p>
                    <p style={{textAlign:'center',fontSize:"14px",height:'50px',lineHeight:'50px'}}>—  {this.state.singer}  —</p>
                </div>
                {this.state.sel===0?<div className={"pic"} style={{height:'300px'}}>
                    <img id={'img'} ref={"pic"} src={this.state.pic} alt="" />
                </div>:<div className={"word"}>歌词</div>}
                <div className={"play"}>
                    <audio autoplay="autoplay"  src={this.state.song} controls={"controls"} ref={"audio"}></audio>
                    <br/>
                    <span>1:56</span>
                    <div className={"loading"} ref={'loading'}>
                        <div className={"inline-loading"} ref={'inline-loading'}></div>
                    </div>
                    <span>3:40</span>
                </div>
                <div className={"control"}>
                    <ul>
                        <li id={'pre'}  className={'icon iconfont icon-shangayishou'} onClick={this.jump.bind(this,'pre')}></li>
                        <li id={'change'} className={this.state.change===0?'icon iconfont icon-pcduanbizhixiazaicishutubiao':'icon iconfont icon-bofang2'} onClick={this.play.bind(this)}></li>
                        <li id={'next'} className={'icon iconfont icon-xiayishou1'} onClick={this.jump.bind(this,'next')}></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(SongPlay)

