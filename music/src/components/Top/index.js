import React from 'react'
import './style.css'
import {
    BrowserRouter as Router,
    withRouter,
    Link,
    NavLink,
    Route
} from 'react-router-dom'
 class Top extends React.Component{
    componentDidMount() {
        console.log(11111,this.props)
    }

    render() {
        return (
            <div>
                <header>
                    <span className={'top'}>
                        <img height={"35px"} src={require("../../assets/img/logo-nav.png")} alt=""/>
                        <Router>
                            <NavLink to={"/search"}>
                                <input className={'box'} placeholder={"搜索歌曲"} type="text" onClick={()=>{
                                    this.props.history.push('/search')
                                }}/>
                            </NavLink>

                        </Router>
                    </span>

                </header>
            </div>
        )
}
}
export default withRouter(Top)