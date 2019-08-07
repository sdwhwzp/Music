import "../../index.css"
import React from 'react'
import axios from "axios"
import {withRouter,Route} from "react-router-dom"//不被route包含的组件不能获取history，match，location，用这个组件可以获取
import BS from 'better-scroll'
import getState from "../../common/getState"
//引入获取state值的函数方法

class Singer extends React.Component {
    constructor() {
        super();
        this.state = {
            ListSinger:[],
            nameList:{},
            sel:"A",
            starty:0,
            top:140
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
        this.scroll = new BS(".swipe",{click:true,probeType:2})//初始化better-scroll，其中click值为true，否则无法点击页面
        this.scroll.on('scroll',({x,y})=>{//监听滚动事件，获取滚动y轴距离

            let pos=this.getPosition()
            let posy=-y
            for(let i=0;i<pos.length;i++){
                if(pos[i]<posy&&pos[i+1]>=posy){//判断此时位置是处于什么区间，得出此时的下标

                    let arrs=[]//arrs中为A,B,C,D等key值
                    for (let key in this.state.nameList) {
                        arrs.push(key)
                    }
                    this.setState({
                        sel:arrs[i]//根据下标得出key值，更改sel的classname，产生高光
                    })
                    break;
                }
            }
        })
        this.starty=0

    };

    render(){
        return(
            <div className={"singer-list"}>

                <div className={'singer-top'} style={{height:"45px",lineHeight:'45px'}}>
                        <span className={"icon iconfont icon-navbankicon"} onClick={()=>{
                            this.props.history.go(-1)
                        }}></span>
                        <span style={{paddingLeft:'147px'}}>歌手</span>
                </div>
                <div className={"swipe"}>
                    <ol >
                        {
                            Object.keys(this.state.nameList).map((key)=>{//遍历对象方法
                                return (
                                    <li  key={key} ref={key}>
                                        <div className={"indexname"}>{key}</div>
                                        <ul className={"singer_name"} >
                                            {
                                                this.state.nameList[key].map((v,i)=>{
                                                    return(
                                                            <li key={i} onClick={()=>{
                                                                this.props.history.push({
                                                                    pathname:`/songlist/${v.Fsinger_mid}/${v.Fsinger_name}`,

                                                                })
                                                            }}>
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

                <ul className={"leftnav"} onTouchMove={this.TouchMove.bind(this)} onTouchStart={this.TouchStart.bind(this)} ref={"rightnav"}>
                    {
                        Object.keys(this.state.nameList).map((key)=>{
                            return(
                                <li className={key==this.state.sel?'sel':""} key={key}  onClick={this.select.bind(this,key)} >
                                    {key}
                                </li>

                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    getPosition(){//通过refs获得绑定的li元素，并且获得每个元素距离顶部的距离，放进数组中
        let els = this.refs
        let arrs = []
       for(const key in els){
            if(key!=='rightnav'){
                let distence = els[key].offsetTop
                arrs.push(distence)
            }
       }
      return arrs
    }
     TouchStart(e){//获取点击开始时的位置
         e.persist()
         this.setState({
             starty:e.touches[0].clientY,//触摸时候的高度
         },()=>{
             let index = Math.ceil(this.state.starty/20)//获取起始的下标
             let arrs=[]
             for (let key in this.state.nameList) {
                 arrs.push(key)//将li的key值放进数组中，
             }
             let item = arrs[index]//查取key值对应的元素,由于上面还有一段距离，此时的item向下偏移一定的元素

         })

     }
    TouchMove(e){//监听触摸移动是的位置
        let startIndex = Math.ceil((this.state.starty-this.state.top)/20)//开始位置距离最上面的距离减去上面恒定距离为开始位置的固定下标
        e.persist()
        let y=e.touches[0].clientY-this.state.starty//此时鼠标距离上面位置减去开始位置距离最上面的距离
        let index = Math.ceil(y/20)+startIndex//开始位置下标加上向下移动的下标为移动位置的下标
        let arrs=[]
        for (let key in this.state.nameList) {
            arrs.push(key)
        }
        let item = arrs[index]
        this.select(item)
     }
    select(key){//通过A,B,C,D等key值更改sel的classname
        this.setState({
            sel:key
        },()=>{
            this.scrollItem(key)

        })


    }
     scrollItem(key){//获取dom元素，通过scrollToElement到达所绑定的元素位置
         let el=this.refs[key]
         this.scroll.scrollToElement(el)
     }

}
export default withRouter(Singer)
