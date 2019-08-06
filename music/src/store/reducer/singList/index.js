import initstate from '../../state/singList'
import actionType from '../../actionType/singList'
export default function (state = initstate, {type,playload}) {
	state=JSON.parse(JSON.stringify(state))
	if (type===actionType.GET_SINGLIST){
		state=playload
	}
	if (type ===actionType.GET_SINGLISTDETAIL){
		state=playload
	}
	return state
}