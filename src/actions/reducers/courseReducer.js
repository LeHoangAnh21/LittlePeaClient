import {
	GET_COURSE,
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	FIND_COURSE_ID
} from "../context/constant";

export const courseReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_COURSE:
			return {
				...state,
				courses: payload,
				coursesLoading: false
			}
		case ADD_COURSE:
			return {
				...state,
				courses: [...state.courses, payload]
			}
		case FIND_COURSE_ID:
			return {
				...state,
				course: payload
			}
		case DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter(course => course._id !== payload)
			}
		case UPDATE_COURSE:
			const updateCourse = state.courses.map(course => course._id === payload._id ? payload : course)
			return {
				...state,
				courses: updateCourse
			}
		default:
			return state
	}
}