import React from "react"
import {withRouter} from 'react-router-dom'
import Lyric from 'lyric-parser'
import axios from 'axios'
import BS from 'better-scroll'
import getTime from '../../common/getTime'//封装一个将秒数转化为分钟：秒的形式的函数
import getVid from "../../common/getVid/index";//将songmid放进数组中，用来切换歌曲
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
            change:0,
	        color:"white",
            duration:0,
            playLeft:0,
            arr1:[],
            idx:0,
            word:'暂无歌词'
        }
    }
	componentWillMount() {

		axios.get('/music/colorsing',{
			params:{
				userName:localStorage.userName,
				id:this.props.match.params.id
			}
		}).then(({data})=>{
			// console.log(data)
			if (data.ok === -1) {

			}else {
				this.setState({
					color:data.color
				})
			}
		})
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
                let str = data.data
                this.setState({
                    str:str
                })
                this.lyric = new Lyric(str,(line)=>{
                    // console.log(line.txt)
                    this.setState({
                        word:line.txt
                    })
                })
                // console.log(this.lyric)
                this.lyric.play()
                let arr=this.lyric.lines
                this.setState({
                    arr1:arr
                })

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
        setTimeout(()=>{
            let audio = this.refs.audio
            let str = getTime(audio.duration)

            this.setState({
                duration : str
            })
        },1000)

    }
    jump(type){//上一曲与下一曲的切换
        if(type==='next'){
            this.lyric.play()
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
                                let str = data.data
                                this.lyric = new Lyric(str,(line)=>{
                                    this.setState({
                                        word:line.txt
                                    })
                                })
                                this.lyric.play()
                                let arr=this.lyric.lines
                                // console.log()
                                this.setState({
                                    arr1:arr
                                })
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
            if(img){
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
            }
            setTimeout(()=>{
                let audio = this.refs.audio
                let str = getTime(audio.duration)
                this.setState({
                    duration : str
                })
            })
        }else {
            this.lyric.play()
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
                                let str = data.data
                                this.lyric = new Lyric(str,(line)=>{
                                    this.setState({
                                        word:line.txt
                                    })
                                })
                                this.lyric.play()
                                let arr=this.lyric.lines
                                // console.log()
                                this.setState({
                                    arr1:arr
                                })
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
        setTimeout(()=>{
            let audio = this.refs.audio
            let str = getTime(audio.duration)

            this.setState({
                duration : str
            })
        })
    }
    play(){//播放与停止播放按键
        let audio=this.refs.audio
        if(audio.paused){
            this.lyric.togglePlay()
            audio.play()
            this.setState({
                change:0
            })
        }else{

            this.lyric.togglePlay()
            audio.pause()
            this.setState({
                change:1
            })
        }
    }
    watch(){//时刻监听播放进度，时刻刷新render
        let audio = this.refs.audio
            let str = getTime(audio.currentTime)
            this.refs.start.innerHTML=str
            let loading=this.refs.songwidth
            // console.log(audio.currentTime,audio.duration)
            this.setState({
                playLeft:(audio.currentTime/audio.duration)*223
            })
            loading.style.width=(audio.currentTime/audio.duration)*223+"px"
            this.setState({
                loading:loading
            })
            let arr2=this.state.arr1
    }
    setTime(e){//设置进度条点击快进
            const len = this.refs.loading.clientWidth / 24;
            // 将整个进度条分为24份
            const windowWidth = window.innerWidth - this.refs.loading.clientWidth - this.refs.loading.offsetLeft - 20;
            let lineWidth;
            if (windowWidth > 240) {
                // 当导航显示时，计算整个滑块的宽度要减去导航的宽度240px
                lineWidth = e.pageX - this.refs.loading.offsetLeft - 240;
            } else {
                lineWidth = e.pageX - this.refs.loading.offsetLeft;
            }
            // 将最终的滑块宽度按百分比进行转换
            const innerWidth = Math.round(lineWidth / len);
            this.refs.songwidth.style.width = 100 / 24 * innerWidth + '%';
            let newWidth=100 / 24 * innerWidth/100;
            let audio = this.refs.audio
            audio.currentTime = newWidth*audio.duration

            this.lyric.seek(audio.currentTime*1000)
    }//点击跳转快进条
    collections(){
		if (this.state.color === "white") {
			axios.get('/itool/song',{
				params:{
					id:this.props.match.params.id
				}
			}).then(({data})=>{

				axios.get('/music/sing',{
					params:{
						name:data.data[0].name,
						id:this.props.match.params.id,
						subtitle:data.data[0].subtitle,
						token:localStorage.token,
						singerName:data.data[0].singer[0].name,
						pic:this.state.pic
					}
				}).then(({data})=>{
					// console.log(data)
					if (data.ok === -1) {
						alert(data.msg)
					}else {
						this.setState({
							color:data.color
						})
					}
				})
			})
		}else{
			axios.delete('/music/sing',{
				params:{
					token:localStorage.token,
					id:this.props.match.params.id
				}
			}).then(({data})=>{
				if (data.ok === -1) {
					alert(data.msg)
				}else {
					this.setState({
						color:data.color
					})
				}
			})
		}
    }
    changeSel(type){
        if(type==='pic'){
            this.setState({
                sel:1
            })
        }else {
            this.setState({
                sel:0
            })
        }
        // console.log(this.refs.wrapper)
        // console.log(this.state.sel)
        // if(this.state.sel===0){
        //     this.scroll = new BS('.wrapper')
        // }

    }
    render(){
        return(
            <div className={"song-play"}>
                <div className={'song-header'}>
                    <p style={{textAlign:'center',height:'30px',lineHeight:'30px',fontSize:'18px'}}><span id={'song-back'} className={'icon iconfont icon-xiangxiadejiantou'} style={{position:"fixed",left:"15px"}} onClick={()=>{this.props.history.go(-1)}}></span>{this.state.name}</p>
                    <p style={{textAlign:'center',fontSize:"14px",height:'50px',lineHeight:'50px'}}>—  {this.state.singer}  —</p>
                </div>
                {this.state.sel===0?<div className={"pic"} style={{height:'300px'}} onClick={this.changeSel.bind(this,'pic')}>
                    <img id={'img'} style={{height:"300px",width:"300px"}} className={this.state.change===0?'an':""} ref={"pic"} src={this.state.pic} alt="" />
                </div>:
                    <div  className={"wrapper"} style={{width:'375.2px',height:"300px",overflow:'scroll',textAlign:'center'}} onClick={this.changeSel.bind(this,'word')}>

                        <ul className={'wordPlay'} style={{height:'400px'}}>
                            {this.state.arr1.map((v,i)=>{
                                return(
                                    <li key={i} className={this.state.word===v.txt?'idx':''} >
                                        {v.txt}
                                    </li>
                                )
                            })}
                        </ul>
                </div>}
                <div className={"play"}>
                    <audio autoPlay="autoplay"  src={this.state.song}  ref={"audio"} onTimeUpdate={this.watch.bind(this)} onEnded={()=>{
                        if(this.refs.audio.ended){
                            this.jump('next')
                        }
                    }}></audio>
                    <br/>
                    <span ref={'start'}>0:00</span>
                    <div className={"loading"} ref={'loading'} onClick={this.setTime.bind(this)} >
                        <div className={"inline-loading"} ref={'songwidth'}></div>
                    </div>
                    <span>{this.state.duration}</span>
                </div>
                <div className={"control"}>
	                <a href="javascript:;" onClick={this.collections.bind(this)}><i style={{color:this.state.color}} className={"icon iconfont icon-aixin"} ></i></a>
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

