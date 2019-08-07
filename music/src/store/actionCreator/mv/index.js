import actionType from '../../actionType/mv'
import axios from  'axios'
import store from '../../index'

export const getMvlist =function (playload) {
	return {
		type:actionType.GET_MV_LIST,
		playload
	}
}
export const getMvPlayer =function (playload) {
	return {
		type:actionType.GET_MV_PLAYER,
		playload
	}
}
export const getMvDetail =function (playload) {
	return {
		type:actionType.GET_MV_DEATIL,
		playload
	}
}
export const getMvDiscuss =function (playload) {
	return {
		type:actionType.GET_MV_DISCUSS,
		playload
	}
}
export default {
	getMvlist(dispatch,pageSize,cb){
		axios.get("/itool/mv/hot",{
			params:{
				pageSize,
				page:1
			}
		}).then(({data})=>{

			dispatch(getMvlist(data.data.list))
			let state = store.getState();

			cb(state)
		})
	},
	getMvPlayer(dispatch,id,cb){
		axios.get('/itool/mvUrl',{
			params:{
				id,
				isRedirect:0
			}

		}).then(({data})=>{

			dispatch(getMvPlayer(data.data))
			let state = store.getState();

			cb(state)
		})
	},
	getMvDetail(dispatch,id,cb){
		axios.get('/itool/mv',{
			params:{
				id
			}

		}).then(({data})=>{

			dispatch(getMvDetail(data.data))
			let state = store.getState();

			cb(state)
		})
	},
	getMvDiscuss(dispatch,id,pageSize,cb){
		axios.get("/itool/comment/mv",{
			params:{
				pageSize,
				id
			}
		}).then(({data})=>{
			// console.log(data.data.commentlist)
			dispatch(getMvDiscuss(data.data.commentlist))
			let state = store.getState();
			cb(state)
		})
	},
}