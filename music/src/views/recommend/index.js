import React from 'react'
import axios from  'axios'
import  {withRouter} from 'react-router-dom'
 class Recommend extends React.Component {
	componentWillMount() {
		console.log(this.props.match.params)
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
export default withRouter(Recommend)