import Player from '../../views/player'
export default [  {
	to:"/player",
	path:"/player/:id",
	component:Player,
	meta:{
		title:"排行榜",
		isFooter:false
	}
}]