import React from 'react'
import router from "../../router";
import {Route, NavLink} from 'react-router-dom'
import './style.css';

export default class Nav extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			positon: 10
		}
	}
	render() {
		return (
			<footer>
				{router.map((v, i) => {
					return (
							<span key={i} className={'nav'}>
							{v.meta.isFooter ?<NavLink exact={v.exact} style={{color: 'gray'}} activeStyle={{color: "green"}}to={v.to}><i className={"icon iconfont " + " " + v.iconfont}></i>{v.context}
								</NavLink> : null}

						</span>


					)
				})}
			</footer>

					)
				}
				}