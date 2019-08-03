import loginType from '../../actionType/login'
import axios from 'axios'
export const login=(playload)=>{

	return {
		type:loginType.CHANGE_LOG,
		playload
	}
}
export default {
	changeLog(dispatch){
		let ok=1;
		if (localStorage.admin) {
			ok=1
		}else {
			ok=-1
		}
			dispatch(login(ok))
},
	getLogin(dispatch,info){
		axios.post('/music/login',{
			adminName:info.userName,
			password:info.password
		}).then(({data})=>{
			console.log(data)
		})

	}
}
