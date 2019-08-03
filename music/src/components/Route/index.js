import {Route} from 'react-router-dom'
import React from  'react'
import router from '../../router'

export  default class NavRoute extends React.Component {
	constructor(props){
		super(props)
	}


	render() {
		return (
			<div>

				{router.map((v,i)=>{
					return (
						<div key={i} id={"route"} >
								<Route  exact={v.exact} path={v.path} render={()=><v.component {...this.props}/>} ></Route>
						</div>
					)
				})}
			</div>

		)
	}
}