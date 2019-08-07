import React from "react"
import {withRouter} from 'react-router-dom'
import axios from 'axios'
class SongPlay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id
        }
    }
    componentDidMount(){
        axios.get(`/qq/tencent/url?id=${this.state.id}&quality=128`)
            .then((data) => {
                console.log(data)
            })
    }
    render(){
        return(
            <div>
                这里是歌曲播放界面
            </div>
        )
    }
}
export default withRouter(SongPlay)