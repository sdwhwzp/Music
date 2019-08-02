import React from 'react'

export default class My extends React.Component {
	constructor(props){
		super(props)
	}
	componentWillMount() {

	}

	goback(){

		this.props.history.go(-1)
	}
	render(){
		return(
			<div>注册
				<input type="button" value={"后退"} onClick={this.goback.bind(this)}/>
			</div>
		)
	}
}