import React from 'react'
import axios from  'axios'
import {
	withRouter
} from 'react-router-dom'
class Recommend extends React.Component {
	constructor(){
		super();
		this.state={
			songSheetList:[]
		}
	}
	componentWillMount() {
		console.log(this.props.match.params);
		axios.get("/music/singList",{
			params:{
				disstid:3602407677
			}
		})
			.then(({data})=>{
				// console.log(data);
				this.setState({
					songSheetList:data.data.list
				});
				// console.log(this.state.songSheetList);
			})
	}
	detail(dissid){
		this.props.history.push('/singlistdetail/'+dissid)
	}
	render(){
		return(
			<div className={"songSheetList"}>
				{
					this.state.songSheetList.map((v,i)=>{
						return(
							<div key={i} className={"songSheetList_l"} >
								<a href={'javascript:;'} onClick={this.detail.bind(this,v.dissid)}><img src={v.imgurl} alt=""/></a>
								<p>{v.dissname}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
}
export default withRouter(Recommend);