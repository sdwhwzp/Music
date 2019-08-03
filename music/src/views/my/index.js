import React from 'react'
import {NavLink} from 'react-router-dom'
export default class My extends React.Component {
	constructor(){
		super()
		this.state={
			log:true
		}
	}
	componentWillMount() {
     if (localStorage.admin) {
     	this.setState({
	        log:false
        })
     }

	}

	render(){
		return(

			<div className={"my"}>

					{this.state.log?<NavLink className={"login"} to={"/login"}>立即登录</NavLink>:"我的"}


			</div>

		)
	}
}