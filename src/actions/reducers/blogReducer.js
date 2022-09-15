import {
	GET_BLOG,
	ADD_BLOG,
	DELETE_BLOG,
	UPDATE_BLOG,
	FIND_BLOG_ID
} from "../context/constant";

export const blogReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_BLOG:
			return {
				...state,
				blogs: payload,
				blogsLoading: false
			}
		case ADD_BLOG:
			return {
				...state,
				blogs: [...state.blogs, payload]
			}
		case FIND_BLOG_ID:
			return {
				...state,
				blog: payload
			}
		case DELETE_BLOG:
			return {
				...state,
				blogs: state.blogs.filter(blog => blog._id !== payload)
			}
		case UPDATE_BLOG:
			const updateBlog = state.blogs.map(blog => blog._id === payload._id ? payload : blog)
			return {
				...state,
				blogs: updateBlog
			}
		default:
			return state
	}
}
