import React from 'react'
import {NavLink,withRouter} from 'react-router-dom'

 class My extends React.Component {
	constructor(){
		super()
		this.state={
			singList:[],
			singListtwo:[]
		}

	}
	componentWillMount() {
		let _me =this
		if (!this.props.state.login.log) {
			this.props.getSingList(function (state) {
				_me.setState({
					singList:state.singList
				})

			})
			this.props.getSingListTwo(function (state) {
				console.log(state)
				_me.setState({
					singListtwo:state.singList
				})
			})
		}
	}
	detail(dissid){
		this.props.history.push('/singlistdetail/'+dissid)
	}
	isExit(){
		localStorage.token=null
		localStorage.clear()
		this.props.log()
		this.forceUpdate();
	}
	render(){

		if(!this.props.state.login.log) {
			return (
				<div className={"my"}>
					<NavLink className={"login"} to={"/login"}><i className={"icon iconfont icon-wode"}></i>立即登录</NavLink>
					<p>推荐歌单</p>
					<ul>

						{
							this.state.singList.map((v,i)=>{
								return(
									<li key={i}><a href="javascript:;"  data-dissid={v.dissid} onClick={this.detail.bind(this,v.dissid)}><img src={v.imgurl} alt=""/>{v.dissname}</a></li>
								)
							})
						}
					</ul>
					<p>最新歌单</p>
					<ul>

						{
							this.state.singListtwo.map((v,i)=>{
								return(
									<li key={i}><a href="javascript:;"  data-dissid={v.dissid} onClick={this.detail.bind(this,v.dissid)}><img src={v.imgurl} alt=""/>{v.dissname}</a></li>
								)
							})
						}
					</ul>
				</div>
			)
		}else {
			return(
				<div>
					<p>我的</p>

					<p>推荐歌单</p>
					<ul>

						{
							this.state.singList.map((v,i)=>{
								return(
									<li key={i}><a href="javascript:;"  data-dissid={v.dissid} onClick={this.detail.bind(this,v.dissid)}><img src={v.imgurl} alt=""/>{v.dissname}</a></li>
								)
							})
						}
					</ul>
					<p>最新歌单</p>
					<ul>

						{
							this.state.singListtwo.map((v,i)=>{
								return(
									<li key={i}><a href="javascript:;"  data-dissid={v.dissid} onClick={this.detail.bind(this,v.dissid)}><img src={v.imgurl} alt=""/>{v.dissname}</a></li>
								)
							})
						}
					</ul>
					<input type="button" value={"退出"} onClick={this.isExit.bind(this)}/>

				</div>
			)
		}
	}

}
export default withRouter(My)