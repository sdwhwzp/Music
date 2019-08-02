import {Route} from 'react-router-dom'
import React from  'react'
import router from '../../router'
export  default class NavRoute extends React.Component {
	render() {
		return (
			<div>

				{router.map((v,i)=>{
					return (
						<span key={i}>
								<Route exact={v.exact} path={v.path} component={v.component}></Route>
						</span>
					)
				})}
			</div>

		)
	}
}