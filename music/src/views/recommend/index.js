import React from 'react'
import axios from  'axios'
export default class Recommed extends React.Component {
	componentWillMount() {
		axios.get("/music/singList",{
			params:{
				disstid:3602407677
			}
		})
			.then(({data})=>{
				console.log(data)
			})
	}

	render(){
		return(
			<div>推荐</div>
		)
	}
}