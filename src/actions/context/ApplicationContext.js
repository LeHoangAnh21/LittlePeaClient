import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { applicationReducer } from '~/actions/reducers/applicationReducer'
import axios from 'axios';
import {
	GET_APPLICATION,
	ADD_APPLICATION,
	DELETE_APPLICATION,
	FIND_APPLICATION_ID
} from './constant';

export const ApplicationContext = createContext()

const ApplicationContextProvider = ({ children }) => {

	const [applicationState, dispatch] = useReducer(applicationReducer, {
		application: null,
		applications: [],
		applicationsLoading: true
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//Get applications
	const getApplication = async () => {
		try {
			const response = await axios.get(`${apiURL}/application`)
			if (response) {
				dispatch({ type: GET_APPLICATION, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add application
	const addApplication = async newApplication => {
		try {
			const response = await axios.post(`${apiURL}/application/create`, newApplication)

			if (response.data.success) {
				dispatch({ type: ADD_APPLICATION, payload: response.data.application })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find application id
	const findApplicationId = applicationId => {
		const application = applicationState.applications.find(application => application._id === applicationId)
		dispatch({ type: FIND_APPLICATION_ID, payload: application })
	}

	//Delete application
	const deleteApplication = async applicationId => {
		try {
			const response = await axios.delete(`${apiURL}/application/${applicationId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_APPLICATION, payload: applicationId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	const [showAddApplicationModal, setShowAddApplicationModal] = useState(false);
	const [showDeleteApplicationModal, setShowDeleteApplicationModal] = useState(false);

	const applicationContextData = {
		applicationState,
		getApplication,
		showAddApplicationModal,
		setShowAddApplicationModal,
		addApplication,
		deleteApplication,
		showDeleteApplicationModal,
		setShowDeleteApplicationModal,
		findApplicationId,
		showToast,
		setShowToast,
	}

	return (
		<ApplicationContext.Provider value={applicationContextData}>
			{children}
		</ApplicationContext.Provider>
	)

}

export default ApplicationContextProvider;
