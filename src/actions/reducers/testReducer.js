import {
	GET_TEST,
	ADD_TEST,
	DELETE_TEST,
	UPDATE_TEST,
	FIND_TEST_ID
} from "../context/constant";

export const testReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_TEST:
			return {
				...state,
				tests: payload,
				testsLoading: false
			}
		case ADD_TEST:
			return {
				...state,
				tests: [...state.tests, payload]
			}
		case FIND_TEST_ID:
			return {
				...state,
				test: payload
			}
		case UPDATE_TEST:
			const updateTest = state.tests.map(test => test._id === payload._id ? payload : test)
			
			return {
				...state,
				tests: updateTest
			}
		case DELETE_TEST:
			return {
				...state,
				tests: state.tests.filter(test => test._id !== payload)
			}
		default:
			return state
	}
}
