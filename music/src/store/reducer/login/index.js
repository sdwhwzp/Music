import initState from '../../state/login'
import actionType from '../../actionType/login'
export default function (state = initState, {type, playload}) {

	if (type === actionType.CHANGE_LOG) {
		if (playload === 1) {
			state.log=true
		}else {
			state.log=false
		}
	}
	return state
}