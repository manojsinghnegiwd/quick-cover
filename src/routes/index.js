import React, { Component } from 'react'
import {
   Switch,
    Route,
    BrowserRouter
} from 'react-router-dom';
import App from '../App.js'
import Homepage from '../components/Homepage'

class Routes extends Component {
	render(){
		return(
		    <BrowserRouter>
		        <Switch>
		            <Route exact path="/" component={Homepage}/>
		            <Route path="/svg" component={App}/>
		        </Switch>
		    </BrowserRouter>			
			)
	}
}

export default Routes;
