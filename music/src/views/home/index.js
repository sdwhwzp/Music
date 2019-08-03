import React from 'react'
// import Swiper from 'swiper/dist/js/swiper';
// import 'swiper/dist/css/swiper.css';
import axios from 'axios';
export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			songlist:[]
		}
	}
	render(){
		return(
			<div >
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