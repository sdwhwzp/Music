import React from 'react'
<<<<<<< HEAD
// import Swiper from 'swiper/dist/js/swiper';
// import 'swiper/dist/css/swiper.css';
import axios from 'axios';
=======

import {NavLink} from 'react-router-dom'

import homebackground from '../../assets/images/logo.png';
import axios from 'axios';
const homeImage = {
	backgroundSize:'100% 100%',
	backgroundImage: 'url(' + homebackground + ')'
}

>>>>>>> 5603f20cb9c843419295c3159cd2a2f3a5b1fc2a
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
			<div >
=======
			<div>

				首页
				<NavLink className={"singer"} to={"/singer"}>歌手</NavLink>

>>>>>>> 5603f20cb9c843419295c3159cd2a2f3a5b1fc2a
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
		axios.get("/qq/fcg_v8_toplist_cp.fcg?&topid=27")
			.then(({data})=>{
				this.setState({
					songlist:data.songlist
				})
				console.log(data);
			})
	}
}