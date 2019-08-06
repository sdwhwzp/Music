import React from 'react'
import axios from  'axios'
export default class Recommed extends React.Component {
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
				console.log(data);
				this.setState({
					songSheetList:data.data.list
				});
				console.log(this.state.songSheetList);
			})
	}
	render(){
		return(
			<div className={"songSheetList"}>
				{
					this.state.songSheetList.map((v,i)=>{
						return(
							<div key={i} className={"songSheetList_l"}>
								<img src={v.imgurl} alt=""/>
								<p>{v.dissname}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
}