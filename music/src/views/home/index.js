import React from 'react'
import {NavLink} from 'react-router-dom'
export default class Home extends React.Component {
	render(){
		return(
			<div>
				首页
				<NavLink className={"singer"} to={"/singer"}>歌手</NavLink>
			</div>
		)
	}
}