import React from 'react'
import axios from  'axios'
import  {withRouter} from 'react-router-dom'
class SingListDetail extends React.Component {
	constructor(){
		super()
		this.state={

			singListTitle:"",
			introduce:'',
			nickname:"",
			visitnum:"",
			songnum:"",
			songList:[],
			logo:'',
			id:''
		}
	}
	componentWillMount() {
		let _me =this;
		// console.log(this.props.match.params.dissid);
		this.props.getSingListDetail(this.props.match.params.dissid,function (state) {
				console.log(state.singList[0],555)
			var reg = new RegExp("&#8226;");
			_me.setState({
				singListTitle:state.singList[0].dissname.replace(reg,""),
				introduce:state.singList[0].desc,
				nickname:state.singList[0].nickname,
				visitnum:state.singList[0].visitnum,
				songnum:state.singList[0].songnum,
				songList:state.singList[0].songlist,
				logo:state.singList[0].logo,
				id:state.singList[0].songlist.vid
			})
		})
	}
	goback(){
		this.props.history.go(-1)
	}
	render(){
		console.log(this.state.songList,111)
		return(

			<div className={"songListDetail"}>
				<a href="javascript:;" onClick={this.goback.bind(this)}>&lt;</a>

				<p><img src={this.state.logo} alt=""/></p>
				<p>{this.state.singListTitle}</p>
				<p>{this.state.nickname}</p>
				<p>播放量:{this.state.visitnum}</p>
				<p className={"detail"} dangerouslySetInnerHTML={{__html:this.state.introduce} }></p>
				<p>歌单总共{this.state.songnum}首</p>
				<ul>
					<div>
						歌曲
					</div>
					{this.state.songList.map((v,i)=>{
						return(
							<li key={i}><a href="javascript:;"><div>{v.songname}</div>{v.singer[0].name}{v.vid!==""?
								<input type="button" value={"mv"} onClick={this.mvPlayer.bind(this,v.vid)}/>:null}</a></li>
						)
					})
					}
				</ul>

			</div>
		)
	}
	mvPlayer(id){
		this.props.history.push('/mvplayer/'+id)
	}
}
export default withRouter(SingListDetail)