import React from "react";
import {
	withRouter,NavLink,BrowserRouter as Router,
	Route
} from "react-router-dom"
class Mv extends React.Component{
	constructor(){
		super()
		this.state={
			mvPlayer:{},
			mvDetail:{
			},
			id:'',
			isShow:true,
			pageSize:20,
			mvDiscuss:[],
			singer:''
		}
	}
	componentWillMount() {
		const _me =this
		const id=this.props.match.params.id
		this.setState({
			id
		})
		this.props.getMvPlayer(id,function (state) {

			_me.setState({

				mvPlayer:state.mv.mvPlayer
			})

		})
		this.props.getMvDiscuss(id,this.state.pageSize,function (state) {
			console.log(state.mv.mvDiscuss)
			let mvDiscuss
			if (state.mv.mvDiscuss === undefined) {
				mvDiscuss=[]
			}else {
				mvDiscuss=state.mv.mvDiscuss
			}
			_me.setState({
				mvDiscuss
			})

		})
		this.props.getMvDetail(id,function (state) {
			// console.log(state.mv.mvDetail[id],222)
			let singers
			console.log(state.mv.mvDetail[id].singers["0"])
			if (state.mv.mvDetail[id].singers["0"]===undefined) {
				singers="该MV已下架"
			}else {
				singers=state.mv.mvDetail[id].singers["0"].name
			}
			_me.setState({
				mvDetail:state.mv.mvDetail[id],
				singer:singers
			})
		})
	}
	goback(){
		this.props.history.go(-1)
	}
	discuss(){
		this.setState({
			isShow:false
		})
	}
	detail(){
		this.setState({
			isShow:true
		})
	}
	more(){
		const _me=this
		this.state.pageSize=this.state.pageSize+10
		this.props.getMvDiscuss(this.state.id,this.state.pageSize,function (state) {

			let mvDiscuss
			if (state.mv.mvDiscuss === undefined) {
				mvDiscuss=[]
			}else {
				mvDiscuss=state.mv.mvDiscuss
			}
			_me.setState({
				mvDiscuss
			})
		})
	}
	render(){

		return(

			<div className={"mv"}>
				<a href="javascript:;" onClick={this.goback.bind(this)}>&lt;</a>
				<video src={this.state.mvPlayer} controls={true} width={"100%"}></video>
				{/*<Router>*/}
				{/*	<NavLink exact={true} to={'/mvplayer/'+this.state.id}>详情</NavLink>*/}
				{/*	<NavLink to={'/mvplayer/'+this.state.id+"/discuss"}>评论</NavLink>*/}
				{/*	<Route path={'/mvplayer/'+this.state.id} ></Route>*/}
				{/*	<Route path={'/mvplayer/'+this.state.id+"/discuss"}></Route>*/}
				{/*</Router>*/}
				<div>
					<a href="javascript:;" onClick={this.detail.bind(this)}>详情</a>
					<a href="javascript:;" onClick={this.discuss.bind(this)}>评论</a>
				</div>

				{this.state.isShow?<div className={"mvDetail"}>
					<p>演唱者:{this.state.singer}</p>
					<p>{this.state.mvDetail.desc}</p>
				</div>:<div className={"discuss"}>{this.state.mvDiscuss.map((v,i)=>{
					return (
						<p key={i}><img src={v.avatarurl} alt=""/>用户名:{v.nick}<span>:{v.rootcommentcontent}</span></p>
					)
				})}<input type="button" value={"加载更多"} onClick={this.more.bind(this)}/></div>}


			</div>
		)
	}

}
export default withRouter(Mv);