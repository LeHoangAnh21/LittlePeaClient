import {
	GET_APPLICATION,
	ADD_APPLICATION,
	DELETE_APPLICATION,
	UPDATE_APPLICATION,
	FIND_APPLICATION_ID
} from "../context/constant";

export const applicationReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_APPLICATION:
			return {
				...state,
				applications: payload,
				applicationsLoading: false
			}
		case ADD_APPLICATION:
			return {
				...state,
				applications: [...state.applications, payload]
			}
		case FIND_APPLICATION_ID:
			return {
				...state,
				application: payload
			}
		case UPDATE_APPLICATION:
			const updateApplication = state.applications.map(application => application._id === payload._id ? payload : application)
			
			return {
				...state,
				applications: updateApplication
			}
		case DELETE_APPLICATION:
			return {
				...state,
				applications: state.applications.filter(application => application._id !== payload)
			}
		default:
			return state
	}
}
