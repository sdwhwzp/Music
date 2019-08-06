import React from 'react'
import {Route} from 'react-router-dom'
import Components from '../../components'
export default class extends React.Component {

	render() {
		return(
			<>
				{this.props.meta.isFooter?this.props.children[0]:null}
				<Route  exact={this.props.exact} path={this.props.path} render={()=><this.props.component  {...this.props}/>}></Route>
				{this.props.meta.isFooter?this.props.children[1]:null}
			</>

		)
	}
}