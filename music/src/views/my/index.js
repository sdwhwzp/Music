import React from 'react'
import {NavLink} from 'react-router-dom'
export default class My extends React.Component {
	constructor(){
		super()
	}
	isExit(){
		localStorage.admin=null
		localStorage.clear()
		this.props.log()
		this.forceUpdate();
	}
	render(){
		if(!this.props.state.login.log) {
			return (
				<div className={"my"}>
				<NavLink className={"login"} to={"/login"}>立即登录</NavLink>
				</div>
			)
		}else {
			return(
				<div>
					<p>我的</p>
					<input type="button" value={"退出"} onClick={this.isExit.bind(this)}/>
				</div>
			)
		}



	}
}