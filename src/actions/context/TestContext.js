import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { testReducer } from '~/actions/reducers/testReducer'
import axios from 'axios';
import {
	GET_TEST,
	ADD_TEST,
	DELETE_TEST,
	UPDATE_TEST,
	FIND_TEST_ID
} from './constant';

export const TestContext = createContext()

const TestContextProvider = ({ children }) => {

	const [testState, dispatch] = useReducer(testReducer, {
		test: null,
		tests: [],
		testsLoading: true
	})

	//Get Tests
	const getTest = async () => {
		try {
			const response = await axios.get(`${apiURL}/test`)
			if (response) {
				dispatch({ type: GET_TEST, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add Test
	const addTest = async newTest => {
		try {
			const response = await axios.post(`${apiURL}/test/create`, newTest)

			if (response.data.success) {
				dispatch({ type: ADD_TEST, payload: response.data.test })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find Test id
	const findTestId = testId => {
		const test = testState.tests.find(test => test._id === testId)
		dispatch({ type: FIND_TEST_ID, payload: test })
	}

	//Delete Test
	const deleteTest = async testId => {
		try {
			const response = await axios.delete(`${apiURL}/test/${testId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_TEST, payload: testId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Test
	const updateTest = async updatedTest => {
		try {
			const response = await axios.put(`${apiURL}/test/${updatedTest._id}`, updatedTest)
			if (response.data.success) {
				dispatch({ type: UPDATE_TEST, payload: response.data.test })
				console.log(response.data.test);
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showAddTestModal, setShowAddTestModal] = useState(false);
	const [showDeleteTestModal, setShowDeleteTestModal] = useState(false);
	const [showUpdateTestModal, setShowUpdateTestModal] = useState(false);
	// const [viewTestId, setViewTestId] = useState('');

	const testContextData = {
		testState,
		getTest,
		showAddTestModal,
		setShowAddTestModal,
		addTest,
		deleteTest,
		showDeleteTestModal,
		setShowDeleteTestModal,
		updateTest,
		findTestId,
		showUpdateTestModal,
		setShowUpdateTestModal,
		// setViewTestId,
		// viewTestId,
	}

	return (
		<TestContext.Provider value={testContextData}>
			{children}
		</TestContext.Provider>
	)

}

export default TestContextProvider;
