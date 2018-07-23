import * as types from '../types.js';

import store from '../../store';

let {getState} = store;

export const svgSizeAction = (data) => {
	let svgSize = getState().svgSizeReducer.size;
		svgSize = data
		
	 return dispatch => {
	 	dispatch({
	 		type: types.SVG_SIZE,
	 		payload: svgSize
	 	})
	 }
}