import React from 'react'
<<<<<<< HEAD

import {
	BrowserRouter as Router,
	NavLink
} from 'react-router-dom'

import homebackground from '../../assets/images/logo.png';
=======
// import Swiper from 'swiper/dist/js/swiper';
// import 'swiper/dist/css/swiper.css';
>>>>>>> 2ade2b2ea5d5a91d8a455bc1d8bbc0c01a0cb904
import axios from 'axios';
import {NavLink} from "react-router-dom";

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			songlist:[]
		}
	}
	render(){
		return(
<<<<<<< HEAD
			<div>
				<NavLink to={"/search"}>搜索</NavLink>
				首页
				<NavLink className={"singer"} to={"/singer"}>歌手</NavLink>
				<NavLink to={"/rankingList"}>排行榜</NavLink>
=======
			<div >
				首页
				<NavLink className={"singer"} to={"/singer"}>歌手</NavLink>
>>>>>>> 2ade2b2ea5d5a91d8a455bc1d8bbc0c01a0cb904
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
				console.log(data);
			})
	}
}