import React from "react";
import {
	withRouter
} from "react-router-dom"
class Player extends React.Component{
	constructor(){
		super();
		this.state={
			songList:[],
			topInfo:[]
		};

	}
	render(){
		return(
			<div>
				歌曲播放
			</div>
		)
	}

}
export default withRouter(Player);