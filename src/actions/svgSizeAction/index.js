import * as types from '../types.js';

import store from '../../store';

export const svgSizeAction = (data) => {
		
	 return dispatch => {
	 	dispatch({
	 		type: types.UPDATE_SVG_CANVAS_SIZE,
	 		payload: data
	 	})
	 }
}