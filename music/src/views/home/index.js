import React from 'react'

//import homebackground from '../../assets/images/logo.png';

// import Swiper from 'swiper/dist/js/swiper';
// import 'swiper/dist/css/swiper.css';

import axios from 'axios';
import {NavLink} from "react-router-dom";
import Components from "../../components";

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			songlist:[]
		}
	}
	componentWillMount() {
		console.log(this.props,225222)
	}

	render(){
		return(
			<div>
				<NavLink to={"/search"}>搜索</NavLink>
				首页
				<NavLink className={"singer"} to={"/singer"}>歌手</NavLink>
				<NavLink to={"/rankingList"}>排行榜</NavLink>
				<NavLink to={"/recommend"}>歌单</NavLink>

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