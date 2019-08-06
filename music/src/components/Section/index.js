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
                        <NavLink style={{color:"#31c27c"}}  to={"/singer"}>
                            <span  className={'one'}  onClick={()=>{
                                this.props.history.push('/singer')
                            }}>歌手</span>
                        </NavLink>
                        <NavLink style={{color:"#555"}} to={"/rankingList"}>
                            <span className={'two'}  onClick={()=>{
                                this.props.history.push('/rankingList')
                            }}>排行榜</span>
                    </NavLink>

                    </Router>
                </div>

            </div>
        )
    }
}
export default withRouter(Section)