import React from 'react';
import {
    BrowserRouter as Router,
    withRouter,
    Link,
    NavLink,
    Route
} from 'react-router-dom'
class Section extends React.Component{
    render(){
        return(
            <div className={'section'}>
                <div className={'section-one'}>
                    <Router>
                        <NavLink exact style={{color:"gray"}} activeStyle={{color:"#31c27c"}}  to={"/"}>
                            <span  className={'one'}  onClick={()=>{
                                this.props.history.push('/singer')
                            }}>歌手</span>
                        </NavLink>
                        <NavLink exact style={{color:"gray"}} activeStyle={{color:"#31c27c"}} to={"/rankingList"}>
                            <span className={'two'}  onClick={()=>{
                                this.props.history.push('/rankingList')
                            }}>排行榜</span>
                        </NavLink>
                        <NavLink exact style={{color:"gray"}} activeStyle={{color:"#31c27c"}} to={"/recommend"}>
                            <span className={'two'}  onClick={()=>{
                                this.props.history.push('/recommend')
                            }}>歌单</span>
                        </NavLink>
                    </Router>
                </div>

            </div>
        )
    }
}
export default withRouter(Section)