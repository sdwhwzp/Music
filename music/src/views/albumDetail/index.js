import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom"

class AlbumDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            slider: [],
            radioList: [],
            data: [],
            company_new: [],
            commentlist: [],
            albumDetail: [],
            songlist: [],
            pageSize: 5
        }
    }

    // componentWillMount() {
    //     this.props.getAlbumDetail(this.state.pageSize,function (state) {
    //         this.setState({
    //             albumDetail:state.album.albumDetail
    //         })
    //     })
    // }

    // moreList(){
    //     // const _me=this
    //     this.state.pageSize=this.state.pageSize+5
    //     this.props.getAlbumDetail(this.state.pageSize,function (state) {
    //         this.setState({
    //             albumDetail:state.album.albumDetail
    //         })
    //     })
    // }
    // getmyPlayer(){
    //
    //     // alert("请登录！")
    //
    // }
    render() {
        // console.log(321,this.state.albumDetail)
        return (
            <div className={"albumDetail"}>
                <p className={"iconfont icon-navbankicon"} onClick={() => {
                    this.props.history.go(-1)
                }}></p>
                {/*<img className={"albumDetailHead"} height={'300px'} src={this.state.data.headPic} alt=""/>*/}
                {/*<i className={"icon iconfont icon-bofang2"} ></i>*/}

                <div className={"albumDetailHead"}>
                    {
                        this.state.slider.map((v, i) => {
                            return (
                                <div key={v.id}>
                                    <img className="pic" width={"100%"} src={v.picUrl} onClick={() => {
                                        this.props.history.push("/album")
                                    }} alt=""/>
                                </div>

                            )
                        })
                    }

                </div>
                <p className={"love"}>Lover</p>
                <p className={"tay"}>Taylor Swift</p>
                <div className={"playor"}><i className={"c icon iconfont icon-bofang"}></i></div>
                <p className={"albumFloat"}>专辑简介：</p>
                <p className={"time"}>发行时间：{this.state.aDate}</p>
                <p className={"p"}>《{this.state.name}》</p>
                <div className={"desc"}>
                    <p className={"albumDesc"}>{this.state.desc}</p>
                    <div className={"div albumDetail"}>
                        精彩评论：
                        <div>{
                            this.state.commentlist.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <img className={"img"} src={v.avatarurl} alt=""/>:
                                        <img className={"image"} src={v.root_identity_pic} alt=""/><img
                                        className={"image"} src={v.vipicon} alt=""/>
                                        <span className={"span"}>{v.nick}</span>
                                        <p className={"nick"}>{v.rootcommentnick},{v.rootcommentcontent}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <input type="button" value={'加载更多'}/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        // this.getmyPlayer();
        // console.log(11,this.props.location)
        axios.get("/itool/banner")
            .then(({data}) => {
                // console.log(222222,data);
                this.setState({
                    data: data.data
                })
                // console.log(22,this.state)
            })
        axios.get("/qq/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1565236258379&g_tk=1961379485&uin=3103821362&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1")
            .then(({data}) => {
                // console.log(222222,data);
                this.setState({
                    slider: data.data.slider
                })
                // console.log(22,this)
            })
        axios.get("/itool/album?id=001W4mXo4Eywps")
            .then(({data}) => {
                // console.log(444444,data);
                this.setState({
                    data: data.data
                })
                // console.log(666,this.state.data);
                // console.log(7,this.state.data.company)
            })
        axios.get("/qq/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=001IskfD3Vncxo&g_tk=1278911659&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0")
            .then((data) => {
                // console.log(999,data)
                this.setState({
                    data: data.data.data.company_new,
                    desc: data.data.data.desc,
                    name: data.data.data.name,
                    aDate: data.data.data.aDate

                })
            })
        axios.get("/qq/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=1961379485&uin=3103821362&format=json&inCharset=utf-8&needNewCode=1&cid=205360772&reqtype=1&cmd=8&needmusiccrit=0&pagesize=10&lasthotcommentid=0&qq=3103821362&msg_comment_id=&pagenum=0&biztype=1&topid=234988180")
            .then((data) => {
                // console.log(4567,data)
                this.setState({
                    commentlist: data.data.comment.commentlist
                    // commentlist:data.data.hot_comment.commentlist
                })
            })
        axios.get("/qq/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=1961379485&uin=3103821362&format=json&inCharset=utf-8&needNewCode=1&cid=205360772&reqtype=1&cmd=8&needmusiccrit=0&pagesize=10&lasthotcommentid=0&qq=3103821362&msg_comment_id=&pagenum=0&biztype=1&topid=234988180")
            .then((data) => {
                // console.log(789,data.data.hot_comment.commentlist)
                this.setState({
                    commentlist: data.data.hot_comment.commentlist
                })
            })
        axios.get("/qq/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?&format=json")
            .then(({data}) => {
                this.setState({
                    slider: data.data.slider
                })
            })
        axios.get("/qq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?&format=json&tpl=3&page=detail&topid=27")
            .then(({data}) => {
                // console.log(2,this.props)
                console.log(189, data);
                this.setState({
                    songlist: data.songlist
                })
            })
    }
}

export default withRouter(AlbumDetail)