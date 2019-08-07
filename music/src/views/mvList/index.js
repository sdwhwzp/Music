import React from "react";
import {
	withRouter
} from "react-router-dom"
class MvList extends React.Component{
	constructor(){
		super();
		this.state={
			mvList:[],
			pageSize:10
		}
	}
	componentWillMount() {
		const _me=this
		this.props.getMvList(this.state.pageSize,function (state) {

			_me.setState({
				mvList:state.mv.mvlist
			})
		})
	}
	more(){
		const _me=this
		this.state.pageSize=this.state.pageSize+10
		this.props.getMvList(this.state.pageSize,function (state) {

			_me.setState({
				mvList:state.mv.mvlist
			})
		})
	}
	mvPlayer(id){
		// console.log(id)
		this.props.history.push('/mvplayer/'+id)
	}
	render(){
		// console.log(this.state.mvList)
		return(

			<div className={"mvList"}>
				{
					this.state.mvList.map((v,i)=>{
						return (
							<div key={i}><a href="javascript:;" onClick={this.mvPlayer.bind(this,v.vid)}><img src={v.picurl} alt={v.title}/>{v.title}</a></div>
						)
					})
				}
				<div><input type="button" value={"加载更多"} onClick={this.more.bind(this)}/></div>

			</div>
		)
	}

}
export default withRouter(MvList);