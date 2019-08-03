import React from 'react';
import router from './router'
import './App.css';
import {
	BrowserRouter as Router,

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
			<nav >
				<Router >
					<Components.navRoute {...this.props} style={{height:"100%"}}></Components.navRoute>
					<Components.nav ></Components.nav>
				</Router>
			</nav>

		)
	}
}

function mapSateToProps(state) {

	return {
		state,

	}
}

function mapDispatchProps(dispatch) {

	return {
		log(){
			login.changeLog(dispatch)
		},
		getLogin(info) {
			login.getLogin(dispatch,info)
		}
	}
}

export default connect(mapSateToProps, mapDispatchProps)(App);
