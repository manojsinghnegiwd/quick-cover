import * as types from '../../actions/types.js';
const initState ={

	size: {
		width:'',
		height:''
	}

}
export function svgSizeReducer(state = initState, action) {

	switch(action.type) {
		
		case types.UPDATE_SVG_CANVAS_SIZE:
		return { ...state, size: action.payload};
		break;

		default:
		return state;
    }
}