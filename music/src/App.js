import React from 'react';
import router from './router'
import './App.css';
import {
	BrowserRouter as Router,
	NavLink
} from 'react-router-dom'
import Components from './components'
import log from './comonentsWrap/guardRouter'
import {connect} from 'react-redux'
import login from './store/actionCreator/login'
import singList from './store/actionCreator/singlist'
import mv from './store/actionCreator/mv'
import axios from 'axios'
class App extends React.Component {
	componentWillMount() {
		this.props.log()
	}
	render() {
		return (
			<>



				<nav >
					<Router >
						<Components.navRoute {...this.props} style={{height:"100%"}}><Components.Top></Components.Top><Components.nav ></Components.nav></Components.navRoute>

					</Router>
				</nav>
			</>



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
		},
		getSingList(cb){
			singList.getSingList(dispatch,function (state) {
					cb(state)
			})
		},
		getSingListTwo(cb){
			singList.getSingListTwo(dispatch,function (state) {
				cb(state)
			})
		},
		getSingListDetail(disstid,cb) {
			singList.getSingListDetail(dispatch,disstid,function (state) {
				cb(state)
			})
		},
		getMvList(pageSize,cb){
			mv.getMvlist(dispatch,pageSize,function (state) {
				cb(state)
			})
		},
		getMvPlayer(id,cb){
			mv.getMvPlayer(dispatch,id,function (state) {
				cb(state)
			})
		},
		getMvDetail(id,cb){
			mv.getMvDetail(dispatch,id,function (state) {
				cb(state)
			})
		},
		getMvDiscuss(id,pageSize,cb){
			mv.getMvDiscuss(dispatch,id,pageSize,function (state) {
				cb(state)
			})
		}
	}
}
export default connect(mapSateToProps, mapDispatchProps)(App)