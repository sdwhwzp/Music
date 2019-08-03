import React from 'react'
import axios from 'axios'
import  {withRouter} from 'react-router-dom'
class My extends React.Component {
	constructor(props){
		super(props)
	}
	goback(){
		this.props.history.go(-1)
	}
	send(){
		axios.get('/music/mail',{
			params:{
				mail:this.refs.mail.value
			}
		}).then(({data})=>{
			alert(data.msg)
		})
	}
	confirm(){
		if (this.refs.password.value === this.refs.confirm.value) {
			alert("成功")
		}else{
			alert("两次输入密码必须相等")
		}
	}
	logon(){
		console.log(this.refs.mail.value)
		axios.post('/music/logon',{
			adminName:this.refs.userName.value,
			passWord:this.refs.confirm.value,
			mail:this.refs.mail.value,
			code:this.refs.code.value
		}).then(({data})=>{
			console.log(data)
		})
	}
	render(){
		return(
			<div id={"Login"}>
				<a href="javascript:;" onClick={this.goback.bind(this)}>取消</a>
				<div className={"logo"}>
					<img src={[require("../../assets/img/logo.png")]} alt=""/>
				</div>
				<p>账号：<input ref={"userName"} type="text" placeholder={"请输入账号"}/></p>
				<p>邮箱：<input ref={"mail"} type="email" placeholder={"请输入邮箱"}/> <input type="button" value={"发送验证码"} onClick={this.send.bind(this)}/></p>
				<p>密码：<input ref={"password"} type="password" placeholder={"请输入密码"}/></p>
				<p>确认密码：<input ref={"confirm"} type="password" placeholder={"请再次输入密码"} onBlur={this.confirm.bind(this)}/></p>
				<p>验证码：<input ref={"code"} type="text" placeholder={"请输入验证码"}/></p>
				<div>
					<span><a href="javascript:;" onClick={this.logon.bind(this)} >注册</a></span>

				</div>




			</div>
		)
	}
}
export default withRouter(My)