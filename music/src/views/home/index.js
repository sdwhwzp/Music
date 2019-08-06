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
			<div className={"context"}>
				<Components.Section></Components.Section>
				<div className={'section-two'}></div>
				<div className={'section-four'}>


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
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>
					<input type="button" value={"加载更多"}/>

				</div>

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