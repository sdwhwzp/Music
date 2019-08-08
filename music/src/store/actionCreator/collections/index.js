import actionType from '../../actionType/collections'
import axios from 'axios/'
import store from '../../index'
export const myList =function (playload) {
	return{
		type:actionType.GET_MY_LIST,
		playload
	}
}
export  const collectionsList =function (playload) {
	return{
		type:actionType,
		playload
	}
}
export default {
	getMyList(dispatch){
		axios.get('/music/mylist',{
			params:{
				userName:localStorage.userName
			}
		}).then(({data})=>{
			if (data.listName === undefined) {

				dispatch(myList(data.msg))

			}else {
				dispatch(myList(data.listName))
			}

		})
	}
}