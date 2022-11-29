import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { blogReducer } from '~/actions/reducers/blogReducer'
import axios from 'axios';
import {
	GET_BLOG,
	ADD_BLOG,
	DELETE_BLOG,
	UPDATE_BLOG,
	FIND_BLOG_ID,
	LIKE_BLOG,
	UN_LIKE_BLOG,
	SEARCH_BLOG
} from './constant';

export const BlogContext = createContext()

const BlogContextProvider = ({ children }) => {

	const [blogState, dispatch] = useReducer(blogReducer, {
		blog: null,
		blogs: [],
		blogsLoading: true
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//Get blogs
	const getBlog = async () => {
		try {
			const response = await axios.get(`${apiURL}/blog`)
			if (response) {
				dispatch({ type: GET_BLOG, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add blog
	const addBlog = async newBlog => {
		try {
			const response = await axios.post(`${apiURL}/blog/create`, newBlog)

			if (response.data.success) {
				dispatch({ type: ADD_BLOG, payload: response.data.blog })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find Blog id
	const findBlogId = blogId => {
		const blog = blogState.blogs.find(blog => blog._id === blogId)
		dispatch({ type: FIND_BLOG_ID, payload: blog })
	}

	//Delete Blog
	const deleteBlog = async blogId => {
		try {
			const response = await axios.delete(`${apiURL}/blog/${blogId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_BLOG, payload: blogId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Blog
	const updateBlog = async updatedBlog => {
		try {
			const response = await axios.put(`${apiURL}/blog/${updatedBlog._id}`, updatedBlog)
			if (response.data.success) {
				dispatch({ type: UPDATE_BLOG, payload: response.data.blog })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const likeBlog = async blogId => {
		try{
			const response = await axios.put(`${apiURL}/blog/${blogId}/like`);
			if(response.data.success){
				dispatch({ type: LIKE_BLOG, payload: response.data.blog })
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	const unlikeBlog = async blogId => {
		try {
			const response = await axios.put(`${apiURL}/blog/${blogId}/unlike`);
			if (response.data.success) {
				dispatch({ type: UN_LIKE_BLOG, payload: response.data.blog })
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	const [showAddBlogModal, setShowAddBlogModal] = useState(false);
	const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);
	const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false);

	const blogContextData = {
		blogState,
		getBlog,
		showAddBlogModal,
		setShowAddBlogModal,
		addBlog,
		deleteBlog,
		showDeleteBlogModal,
		setShowDeleteBlogModal,
		updateBlog,
		findBlogId,
		showUpdateBlogModal,
		setShowUpdateBlogModal,
		likeBlog,
		unlikeBlog,
		showToast,
		setShowToast,
	}

	return (
		<BlogContext.Provider value={blogContextData}>
			{children}
		</BlogContext.Provider>
	)

}

export default BlogContextProvider;
