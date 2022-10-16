import {
	GET_QUESTION,
	ADD_QUESTION,
	DELETE_QUESTION,
	UPDATE_QUESTION,
	FIND_QUESTION_ID
} from "../context/constant";

export const questionReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_QUESTION:
			return {
				...state,
				questions: payload,
				questionsLoading: false
			}
		case ADD_QUESTION:
			return {
				...state,
				questions: [...state.questions, payload]
			}
		case FIND_QUESTION_ID:
			return {
				...state,
				question: payload
			}
		case DELETE_QUESTION:
			return {
				...state,
				questions: state.questions.filter(question => question._id !== payload)
			}
		case UPDATE_QUESTION:
			const updateQuestion = state.questions.map(question => question._id === payload._id ? payload : question)
			return {
				...state,
				questions: updateQuestion
			}
		default:
			return state
	}
}