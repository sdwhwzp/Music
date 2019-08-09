import React from "react";
import {
	withRouter
} from "react-router-dom"
import axios from 'axios'
class Songlist extends React.Component{
	constructor(){
		super();
		this.state={
			songList:[],
			msg:""
		};

	}
	componentDidMount() {
		axios.get('/music/collectionsList',{
			params:{
				userName:localStorage.userName
			}
		}).then(({data})=>{
			console.log(data)
			if (data.ok === -1) {
				this.setState({
					msg:data.msg
				})
			}else {
				console.log(data.info,222)
				this.setState({
					songList:data.info
				})
			}
		})
	}

	render(){
		return(
			<div className={'collections'}>
				{
					this.state.msg==="暂无收藏歌单"?this.state.msg:this.state.songList.map((v,i)=>{
						return (
						<a className={"collection_a"} key={i} href="javascript:;" onClick={this.detail.bind(this,v.disstid)}>
							<img src={v.headurl} alt=""/>
							<p>{v.dissname}</p>{v.nick}
						</a>
						)
					})
				}
			</div>
		)
	}
detail(dissid){
	this.props.history.push('/singlistdetail/'+dissid)

}
}
export default withRouter(Songlist);