import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { userReducer } from '~/actions/reducers/userReducer'
import axios from 'axios';
import {
	GET_USER,
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

	//Find User id
	const findUserId = userId => {
		const user = userState.users.find(user => user._id === userId)
		dispatch({ type: FIND_USER_ID, payload: user })
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

	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

	const userContextData = {
		userState,
		getUser,
		updateUser,
		showUpdateUserModal,
		setShowUpdateUserModal,
		findUserId
	}

	return (
		<UserContext.Provider value={userContextData}>
			{children}
		</UserContext.Provider>
	)

}

export default UserContextProvider;
