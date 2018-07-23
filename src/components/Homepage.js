import React from 'react'
import {connect} from 'react-redux'
import { svgSizeAction } from '../actions/svgSizeAction'

class Homepage extends React.Component {

	state = {

		size:{
			width:'1000',
			height:'1000'
		},
	}

	getWidthHeight = key => event => {
		const {size} = this.state
		const newSize = {...size}

		newSize[key] = event.target.value

		this.setState({
			size: newSize
		})
	}

	setWidthHeight = () =>{
		const {size} = this.state
		const newSize ={...size}

		if(newSize.width == '0' || newSize.height == '0') {
			newSize.width = '1000'
			newSize.height = '1000'

			this.setState({
				size:newSize
			})
		}

		this.props.dispatch(svgSizeAction(newSize))

		this.props.history.push('/svg')
	}

	render(){
		const {width, height} = this.state.size
		return(
			<div>
				<label>Width :</label>
				<input type="number" placeholder="width" value={width} onChange={this.getWidthHeight('width')} />
				<label>Height :</label>
				<input type="number" placeholder="height" value={height} onChange={this.getWidthHeight('height')}  />
				<button type="submit" onClick={this.setWidthHeight} >create</button>
			</div>
			)
	}
}
export default
 connect(
   state => (
     {

     },
     mapDispatch
   )
 )(Homepage)
const mapDispatch = dispatch => {
 const allActionProps = Object.assign({}, dispatch)
 return allActionProps
}
