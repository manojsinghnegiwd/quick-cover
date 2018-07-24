import * as types from '../types.js';

import store from '../../store';

let {getState} = store;

export const svgSizeAction = (data) => {
	let svgSize = getState().svgSizeReducer.size;
		svgSize = data
		
	 return dispatch => {
	 	dispatch({
	 		type: types.UPDATE_SVG_CANVAS_SIZE,
	 		payload: svgSize
	 	})
	 }
}