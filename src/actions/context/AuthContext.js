import { createContext, useReducer, useEffect, useState } from 'react'
import { apiURL } from '~/api/request';
import { authReducer } from '~/actions/reducers/authReducer'
import setAuthToken from '~/actions/utils/setAuthToken'
import axios from 'axios'
import {
	TOKEN_NAME
} from './constant';

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Authenticate user
	const loadUser = async () => {
		if (localStorage[TOKEN_NAME]) {
			setAuthToken(localStorage[TOKEN_NAME])
		}

		try {
			const response = await axios.get(`${apiURL}/auth`)
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
			}
		} catch (error) {
			localStorage.removeItem(TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
		}
	}

	useEffect(() => {
		loadUser()
	}, [])

	// Login
	const loginAccount = async loginAccountForm => {
		try {
			const response = await axios.post(`${apiURL}/login`, loginAccountForm)
			if (response.data.success)
				localStorage.setItem(
					TOKEN_NAME,
					response.data.accessToken
				)

			await loadUser()

			return response.data
			
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Register
	const registerAccount = async registerForm => {
		try {
			const response = await axios.post(`${apiURL}/register`, registerForm)
			if (response.data.success)
				localStorage.setItem(
					TOKEN_NAME,
					response.data.accessToken
				)

			await loadUser()

			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Logout
	const logoutAccount = () => {
		localStorage.removeItem(
			TOKEN_NAME
		)

		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}

	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);

	// Context data
	const authContextData = { 
		authState,
		loginAccount,
		showLoginModal,
		setShowLoginModal,
		registerAccount,
		showRegisterModal,
		setShowRegisterModal,
		logoutAccount,
		showToast,
		setShowToast,
	}

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
