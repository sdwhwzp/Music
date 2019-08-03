import loginType from '../../actionType/login'
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
}
}
