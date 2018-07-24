import * as types from '../types.js';

export const svgSizeAction = (data) => {
		
	 return dispatch => {
	 	dispatch({
	 		type: types.UPDATE_SVG_CANVAS_SIZE,
	 		payload: data
	 	})
	 }
}