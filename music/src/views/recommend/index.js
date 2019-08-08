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
		this.forceUpdate(true)
	}
	render(){
		return(
			<div className={"songSheetList"}>
				{
					this.state.songSheetList.map((v,i)=>{
						return(
							<div key={i} className={"songSheetList_l"} >
								<a href={'javascript:;'} onClick={this.detail.bind(this,v.dissid)}>
									<img src={v.imgurl} alt=""/>
									<p>{v.dissname}</p>
								</a>
							</div>
						)
					})
				}
			</div>
		)
	}
}
export default withRouter(Recommend);