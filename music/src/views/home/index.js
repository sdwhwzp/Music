import React from 'react'

import {NavLink} from 'react-router-dom'

import homebackground from '../../assets/images/logo.png';
import axios from 'axios';
const homeImage = {
	backgroundSize:'100% 100%',
	backgroundImage: 'url(' + homebackground + ')'
}

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			songlist:[]
		}
	}
	render(){
		return(
			<div>

				首页
				<NavLink className={"singer"} to={"/singer"}>歌手</NavLink>

				{
					this.state.songlist.map((item,index)=>{
						return(
							<div key={item.cur_count}>
								<h3>{item.cur_count}:{item.data.albumname}</h3>
								<span>{item.data.interval}%:{item.data.albumdesc}:</span>
							</div>
						)
					})
				}

			</div>
		)
	}
	componentDidMount() {
		axios.get("/qq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?&topid=27")
			.then(({data})=>{
				this.setState({
					songlist:data.songlist
				})

			})
	}
}