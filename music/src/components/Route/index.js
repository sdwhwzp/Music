import {Route} from 'react-router-dom'
import React from  'react'
import router from '../../router'
import Components from "../index";
import GuardRouter from '../../comonentsWrap/guardRouter'
export  default class NavRoute extends React.Component {
	constructor(props){
		super(props)
	}
	componentWillMount() {
		console.log(this.props)
	}

	render() {
		return (
			<div>

				{router.map((v,i)=>{
					return (
						<div key={i} id={"route"} >
							<Route  exact={v.exact} path={v.path} render={()=><GuardRouter {...v} {...this.props}/>} ></Route>
								{/*<Route  exact={v.exact} path={v.path} render={()=><v.component {...v} {...this.props}/>} ></Route>*/}

						</div>
					)
				})}

			</div>

		)
	}
}