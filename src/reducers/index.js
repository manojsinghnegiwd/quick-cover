import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { svgSizeReducer } from './svgSizeReducer'
export default combineReducers({
	router: routerReducer,
	svgSizeReducer : svgSizeReducer
});