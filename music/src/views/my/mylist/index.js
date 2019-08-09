import React from "react";
import {
	withRouter
} from "react-router-dom"
import axios from "axios";
class Mylist extends React.Component{
	constructor(){
		super();
		this.state={
			data:{},
			info:[]
		}


	}
	componentWillMount() {
		axios.get('music/mysing',{params:{
				userName:localStorage.userName
			}}).then(({data})=>{
			console.log(data)
			this.setState({
				data:data,
				info:data.info
			})
		})
	}

	render(){

		return(
			<div className={"myList"}>
				{this.state.data.msg===undefined? <p >{
					this.state.info.map((v,i)=>{
						return (
							<a key={i} href='javascript:;' onClick={()=>this.props.history.push('/songplay/'+v.id)}>{v.name}</a>
						)
					})
				}</p>:this.state.data.msg}
			</div>
		)
	}

}
export default withRouter(Mylist);