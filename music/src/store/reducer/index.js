import login from './login'
import singList from './singList'
import mv from './mv'
import  {combineReducers}   from 'redux'
export default combineReducers({
	login,
	singList,
	mv
})