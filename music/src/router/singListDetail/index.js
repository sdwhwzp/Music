import SingListDetail from '../../views/singListdetail'
export default [
	{
		to:'/singlistdetail',
		path:'/singlistdetail/:dissid',
		context:"推荐",
		iconfont:"icon-xingxing",
		component:SingListDetail,
		children:{
		},
		meta:{
			title:"歌单详情",
			isFooter:false
		}
	}

]