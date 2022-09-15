import {
	GET_RECRUITMENT,
	ADD_RECRUITMENT,
	DELETE_RECRUITMENT,
	UPDATE_RECRUITMENT,
	FIND_RECRUITMENT_ID
} from "../context/constant";

export const recruitmentReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_RECRUITMENT:
			return {
				...state,
				recruitments: payload,
				recruitmentsLoading: false
			}
		case ADD_RECRUITMENT:
			return {
				...state,
				recruitments: [...state.recruitments, payload]
			}
		case FIND_RECRUITMENT_ID:
			return {
				...state,
				recruitment: payload
			}
		case UPDATE_RECRUITMENT:
			const updateRecruitment = state.recruitments.map(recruitment => recruitment._id === payload._id ? payload : recruitment)
			
			return {
				...state,
				recruitments: updateRecruitment
			}
		case DELETE_RECRUITMENT:
			return {
				...state,
				recruitments: state.recruitments.filter(recruitment => recruitment._id !== payload)
			}
		default:
			return state
	}
}
