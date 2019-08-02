import React from 'react'
import router from "../../router";
import {Route ,NavLink } from '_react-router-dom@5.0.1@react-router-dom'

export default class Nav extends React.Component{
	render() {

		return (
			<div>

				{router.map((v,i)=>{

					return (

							<span key={i} id={'nav'}>
								<NavLink to={v.to}><i className={"icon iconfont "+" "+v.iconfont}></i>{v.context}</NavLink>
							</span>
					)
				})}
			</div>

		)
	}
}