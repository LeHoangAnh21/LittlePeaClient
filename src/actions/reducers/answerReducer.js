import {
	GET_ANSWER,
	ADD_ANSWER,
	DELETE_ANSWER,
	UPDATE_ANSWER,
	FIND_ANSWER_ID
} from "../context/constant";

export const answerReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ANSWER:
			return {
				...state,
				answers: payload,
				answersLoading: false
			}
		case ADD_ANSWER:
			return {
				...state,
				answers: [...state.answers, payload]
			}
		case FIND_ANSWER_ID:
			return {
				...state,
				answer: payload
			}
		case UPDATE_ANSWER:
			const updateAnswer = state.answers.map(answer => answer._id === payload._id ? payload : answer)
			
			return {
				...state,
				answers: updateAnswer
			}
		case DELETE_ANSWER:
			return {
				...state,
				answers: state.answers.filter(answer => answer._id !== payload)
			}
		default:
			return state
	}
}
