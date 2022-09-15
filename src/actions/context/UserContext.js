import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { userReducer } from '~/actions/reducers/userReducer'
import axios from 'axios';
import {
	GET_USER,
	ADD_USER,
	DELETE_USER,
	UPDATE_USER,
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

	//Add user
	const addUser = async newUser => {
		try {
			const response = await axios.post(`${apiURL}/user/create`, newUser)

			if (response.data.success) {
				dispatch({ type: ADD_USER, payload: response.data.user })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find User id
	const findUserId = userId => {
		const user = userState.users.find(user => user._id === userId)
		dispatch({ type: FIND_USER_ID, payload: user })
	}

	//Delete User
	const deleteUser = async userId => {
		try {
			const response = await axios.delete(`${apiURL}/user/${userId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_USER, payload: userId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update User
	const updateUser = async updatedUser => {
		try {
			const response = await axios.put(`${apiURL}/user/${updatedUser._id}`, updatedUser)
			if (response.data.success) {
				dispatch({ type: UPDATE_USER, payload: response.data.user })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showAddUserModal, setShowAddUserModal] = useState(false);
	const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
	const [viewUserId, setViewUserId] = useState('');

	const userContextData = {
		userState,
		getUser,
		showAddUserModal,
		setShowAddUserModal,
		addUser,
		deleteUser,
		showDeleteUserModal,
		setShowDeleteUserModal,
		updateUser,
		findUserId,
		showUpdateUserModal,
		setShowUpdateUserModal,
		setViewUserId,
		viewUserId,
	}

	return (
		<UserContext.Provider value={userContextData}>
			{children}
		</UserContext.Provider>
	)

}

export default UserContextProvider;
