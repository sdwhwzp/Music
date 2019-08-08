import initState from '../../state/mv'
import actionType from '../../actionType/mv'
export default function(state=initState,{type,playload}){
	state=JSON.parse(JSON.stringify(state))

	if (type===actionType.GET_MV_LIST){

		state.mvlist=playload
	}
	if(type===actionType.GET_MV_DEATIL){

		state.mvDetail=playload

	}
	if (type === actionType.GET_MV_PLAYER) {
		state.mvPlayer=playload
	}
	if (type = actionType.GET_MV_DISCUSS) {

		state.mvDiscuss=playload
	}
	return state
}