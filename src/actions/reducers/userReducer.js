import {
	GET_USER,
	ADD_USER,
	DELETE_USER,
	UPDATE_USER,
	FIND_USER_ID
} from "../context/constant";

export const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USER:
			return {
				...state,
				users: payload,
				usersLoading: false
			}
		case ADD_USER:
			return {
				...state,
				users: [...state.users, payload]
			}
		case FIND_USER_ID:
			return {
				...state,
				user: payload
			}
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter(user => user._id !== payload)
			}
		case UPDATE_USER:
			const updateUser = state.users.map(user => user._id === payload._id ? payload : user)
			return {
				...state,
				users: updateUser
			}
		default:
			return state
	}
}
