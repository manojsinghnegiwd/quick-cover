import * as types from '../../actions/types.js';
const initState ={

	size: {
		width:'',
		height:''
	}

}
export function svgSizeReducer(state = initState, action) {

	switch(action.type) {
		
		case types.SVG_SIZE:
		return Object.assign({}, state, { size: action.payload});
		break;

		default:
		return state;
    }
}