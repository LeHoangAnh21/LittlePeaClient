import {
	GET_COMMENT,
	ADD_COMMENT,
	DELETE_COMMENT,
	UPDATE_COMMENT,
	FIND_COMMENT_ID,
} from "../context/constant";

export const commentReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_COMMENT:
			return {
				...state,
				comments: payload,
				commentsLoading: false
			}
		case ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload]
			}
		case FIND_COMMENT_ID:
			return {
				...state,
				comment: payload
			}
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment._id !== payload)
			}
		case UPDATE_COMMENT:
			const updateComment = state.comments.map(comment => comment._id === payload._id ? payload : comment)
			return {
				...state,
				comments: updateComment
			}
		default:
			return state
	}
}
