import React from 'react'
import {NavLink,withRouter,BrowserRouter as Router, Route} from 'react-router-dom'
import Mylist from './mylist'
import Songlist from './songlist'
import axios from 'axios'
 class My extends React.Component {
	constructor(){
		super()
		this.state={
			singList:[],
			singListtwo:[],
			isShow:false
		}

	}
	componentWillMount() {

		let _me =this
		this.props.getMyList()
			this.props.getSingList(function (state) {
				_me.setState({
					singList:state.singList
				})

			})
			this.props.getSingListTwo(function (state) {
				// console.log(state)
				_me.setState({
					singListtwo:state.singList
				})
			})

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
				<div className={"my"}>
					<p className={"localUser"}><span>{localStorage.userName}</span></p>
					<Router forceRefresh={true}>
						<span className={"my_link"}>
							<NavLink to={'/my'} className={"collection_my"}>收藏歌曲 </NavLink>
							<NavLink to={'/my/collection'} className={"collection_my"}>收藏歌单</NavLink>
							<i className={'icon iconfont icon-jiahao'} onClick={()=>{this.setState({isShow:true})}}></i>
						</span>

						<Route exact={true} path={'/my'}  render={()=><Mylist {...this.props} />}></Route>
						<Route path={'/my/collection'}   render={()=><Songlist {...this.props}/>}></Route>
					</Router>
					<div className={"recommendList"}>
						<h3>推荐歌单</h3>
						<ul>

							{
								this.state.singList.map((v,i)=>{
									return(
										<li key={i}><a href="javascript:;"  data-dissid={v.dissid} onClick={this.detail.bind(this,v.dissid)}><img src={v.imgurl} alt=""/>{v.dissname}</a></li>
									)
								})
							}
						</ul>
					</div>
					<input type="button" value={"退出"} onClick={this.isExit.bind(this)}/>

				</div>
			)
		}
	}

}
export default withRouter(My)