import React from 'react'
import  {withRouter} from 'react-router-dom'
 class My extends React.Component {
	constructor(props){
		super(props)
	}


	goback(){

		this.props.history.go(-1)
	}
	render(){
		return(
			<div id={"Login"}>
				<a href="javascript:;" onClick={this.goback.bind(this)}>取消</a>
				<div className={"logo"}>
					<img src={[require("../../assets/img/logo.png")]} alt=""/>
				</div>
				<p>账号：<input type="text" placeholder={"请输入账号"}/></p>
				<p>密码：<input type="password" placeholder={"请输入密码"}/></p>
				<div>
					<span><a href="javascript:;">登录</a></span>
					<span><a href="javascript:;">注册</a></span>
					<span><a href="javascript:;">找回密码</a></span>
				</div>




			</div>
		)
	}
}
export default withRouter(My)