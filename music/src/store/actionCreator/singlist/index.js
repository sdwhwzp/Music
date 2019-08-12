import actionType from '../../actionType/singList'
import axios from 'axios/'
import store from '../../index'
export const singList =function (playload) {
	return {
		type:actionType.GET_SINGLIST,
		playload
	}
}
export const singListDetail =function (playload) {
	return {
		type:actionType.GET_SINGLISTDETAIL,
		playload
	}
}
export default {
	getSingList(dispatch,cb){
		axios.get('/music/singList')
			.then(({data})=>{
				dispatch(singList(data.data.list))
				let state = store.getState();
				cb(state)
			})
	},
	getSingListTwo(dispatch,cb){
		axios.get('/music/singListtwo')
			.then(({data})=>{
				// console.log(data.data.list)
				dispatch(singList(data.data.list))
				let state = store.getState();
				cb(state)
			})
	},
	getSingListDetail(dispatch,disstid, cb) {
		axios.get('/music/detail',{
			params:{
				disstid
			}
		}).then(({data})=>{
			dispatch(singListDetail(data.cdlist))
			let state = store.getState();
			cb(state)

		})
	}
}