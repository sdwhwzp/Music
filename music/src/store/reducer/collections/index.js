import actionType from  '../../actionType/collections'
import initState from '../../state/collections'
export default function (state = initState, {type, playload}) {

	if (type === actionType.GET_MY_LIST) {
		state=playload

	}
	if (type === actionType.GET_COLLECTIONS_LIST) {
		state=playload
	}
	return state
}