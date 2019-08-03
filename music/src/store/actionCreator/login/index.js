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
		if (localStorage.token) {
			ok=1
		}else {
			ok=-1
		}
			dispatch(login(ok))
},
	getLogin(dispatch,info,vm){

		axios.post('/music/login',{
			adminName:info.userName,
			passWord:info.password
		}).then(({data})=>{
			if (data.ok === 1) {
				alert(data.msg)
				localStorage.token=data.token
				dispatch(login(data.ok))
				vm.props.history.push('/my')
			}else {
				alert(data.msg)
			}
		})

	}
}
