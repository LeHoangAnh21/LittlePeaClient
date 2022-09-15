import {
	GET_CATEGORY,
	ADD_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	FIND_CATEGORY_ID
} from "../context/constant";

export const categoryReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_CATEGORY:
			return {
				...state,
				categories: payload,
				categoriesLoading: false
			}
		case ADD_CATEGORY:
			return {
				...state,
				categories: [...state.categories, payload]
			}
		case FIND_CATEGORY_ID:
			return {
				...state,
				category: payload
			}
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(category => category._id !== payload)
			}
		case UPDATE_CATEGORY:
			const updateCategory = state.categories.map(category => category._id === payload._id ? payload : category)
			return {
				...state,
				categories: updateCategory
			}
		default:
			return state
	}
}