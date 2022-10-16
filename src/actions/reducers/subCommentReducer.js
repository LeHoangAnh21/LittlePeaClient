import {
	GET_SUB_COMMENT,
	ADD_SUB_COMMENT,
	DELETE_SUB_COMMENT,
	UPDATE_SUB_COMMENT,
	FIND_SUB_COMMENT_ID,
} from "../context/constant";

export const subCommentReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_SUB_COMMENT:
			return {
				...state,
				subComments: payload,
				subCommentsLoading: false
			}
		case ADD_SUB_COMMENT:
			return {
				...state,
				subComments: [...state.subComments, payload]
			}
		case FIND_SUB_COMMENT_ID:
			return {
				...state,
				subComment: payload
			}
		case DELETE_SUB_COMMENT:
			return {
				...state,
				subComments: state.subComments.filter(subComment => subComment._id !== payload)
			}
		case UPDATE_SUB_COMMENT:
			const updateSubComment = state.subComments.map(subComment => subComment._id === payload._id ? payload : subComment)
			return {
				...state,
				subComments: updateSubComment
			}
		default:
			return state
	}
}
