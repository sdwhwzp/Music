import React from 'react';
import router from './router'
import './App.css';
import {

	BrowserRouter as Router,
NavLink
} from 'react-router-dom'
import Components from './components'
import log from './comonentsWrap'
import {connect} from 'react-redux'
import login from './store/actionCreator/login'
import axios from 'axios'
class App extends React.Component {
componentWillMount() {
	this.props.log()
}
render() {
		return (
			<div>
				<div>
					<Components.Search></Components.Search>
				</div>
				<nav >
					<Router >
						<Components.navRoute {...this.props} style={{height:"100%"}}></Components.navRoute>
						<Components.nav ></Components.nav>
					</Router>
				</nav>
			</div>


		)
	}
}
function mapSateToProps(state) {
	return {
		state,

	}
}function mapDispatchProps(dispatch) {
	return {
		log() {
			login.changeLog(dispatch)
		},
		getLogin(info,vm) {

			login.getLogin(dispatch, info,vm)
		}
	}
}
export default connect(mapSateToProps, mapDispatchProps)(App)
