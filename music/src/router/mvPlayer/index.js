import mv from '../../views/mvPlayer'
export default [  {
	to:"/mv",
	path:"/mvplayer/:id",
	component:mv,
	meta:{
		title:"mv详情",
		isFooter:false
	}
}]