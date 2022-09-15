import {
	GET_LESSON,
	ADD_LESSON,
	DELETE_LESSON,
	UPDATE_LESSON,
	FIND_LESSON_ID
} from "../context/constant";

export const lessonReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_LESSON:
			return {
				...state,
				lessons: payload,
				lessonsLoading: false
			}
		case ADD_LESSON:
			return {
				...state,
				lessons: [...state.lessons, payload]
			}
		case FIND_LESSON_ID:
			return {
				...state,
				lesson: payload
			}
		case DELETE_LESSON:
			return {
				...state,
				lessons: state.lessons.filter(lesson => lesson._id !== payload)
			}
		case UPDATE_LESSON:
			const updateLesson = state.lessons.map(lesson => lesson._id === payload._id ? payload : lesson)
			return {
				...state,
				lessons: updateLesson
			}
		default:
			return state
	}
}