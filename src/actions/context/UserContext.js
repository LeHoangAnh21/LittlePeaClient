import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { userReducer } from '~/actions/reducers/userReducer'
import axios from 'axios';
import {
	GET_USER,
	DELETE_USER,
	// UPDATE_BLOG,
	FIND_USER_ID
} from './constant';

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

	const [userState, dispatch] = useReducer(userReducer, {
		user: null,
		users: [],
		usersLoading: true
	})

	//Get users
	const getUser = async () => {
		try {
			const response = await axios.get(`${apiURL}/user`)
			if (response) {
				dispatch({ type: GET_USER, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	// //Find User id
	// const findUserId = userId => {
	// 	const user = userState.users.find(user => user._id === userId)
	// 	dispatch({ type: FIND_USER_ID, payload: user })
	// }

	// //Delete user
	// const deleteUser = async userId => {
	// 	try {
	// 		const response = await axios.delete(`${apiURL}/user/${userId}`)
	// 		if (response.data.success) {
	// 			dispatch({ type: DELETE_USER, payload: userId })
	// 		}
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	// //Update Blog
	// const updateBlog = async updatedBlog => {
	// 	try {
	// 		const response = await axios.put(`${apiURL}/blog/${updatedBlog._id}`, updatedBlog)
	// 		if (response.data.success) {
	// 			dispatch({ type: UPDATE_BLOG, payload: response.data.blog })
	// 			return response.data
	// 		}
	// 	} catch (err) {
	// 		return err.response.data ? err.response.data : { success: false, message: 'server error' }
	// 	}
	// }

	// const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);
	// const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false);

	const userContextData = {
		userState,
		getUser,
		// deleteBlog,
		// showDeleteBlogModal,
		// setShowDeleteBlogModal,
		// findBlogId,
		// showUpdateBlogModal,
		// setShowUpdateBlogModal,
	}

	return (
		<UserContext.Provider value={userContextData}>
			{children}
		</UserContext.Provider>
	)

}

export default UserContextProvider;
