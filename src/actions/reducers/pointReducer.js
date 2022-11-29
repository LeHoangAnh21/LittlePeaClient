import {
	GET_POINT,
	ADD_POINT,
	FIND_POINT_ID,
} from "../context/constant";

export const pointReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_POINT:
			return {
				...state,
				points: payload,
				pointsLoading: false
			}
		case ADD_POINT:
			return {
				...state,
				points: [...state.points, payload]
			}
		case FIND_POINT_ID:
			return {
				...state,
				point: payload
			}
		default:
			return state
	}
}
