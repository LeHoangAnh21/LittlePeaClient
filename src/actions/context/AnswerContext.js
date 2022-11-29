import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { answerReducer } from '~/actions/reducers/answerReducer'
import axios from 'axios';
import {
	GET_ANSWER,
	ADD_ANSWER,
	DELETE_ANSWER,
	UPDATE_ANSWER,
	FIND_ANSWER_ID
} from './constant';

export const AnswerContext = createContext()

const AnswerContextProvider = ({ children }) => {

	const [answerState, dispatch] = useReducer(answerReducer, {
		answer: null,
		answers: [],
		answersLoading: true
	})

	const [toastAnswer, setToastAnswer] = useState({
		showToastAnswer: false,
		messageAnswer: '',
		typeToastAnswer: null
	})

	//Get Answers
	const getAnswer = async () => {
		try {
			const response = await axios.get(`${apiURL}/answer`)
			if (response) {
				dispatch({ type: GET_ANSWER, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, messageAnswer: 'server error' }
		}
	}

	//Add Answer
	const addAnswer = async newAnswer => {
		try {
			const response = await axios.post(`${apiURL}/answer/create`, newAnswer)

			if (response.data.success) {
				dispatch({ type: ADD_ANSWER, payload: response.data.answer })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, messageAnswer: 'server error' }
		}

	}

	//Find Answer id
	const findAnswerId = answerId => {
		const answer = answerState.answers.find(answer => answer._id === answerId)
		dispatch({ type: FIND_ANSWER_ID, payload: answer })
	}

	//Delete Answer
	const deleteAnswer = async answerId => {
		try {
			const response = await axios.delete(`${apiURL}/answer/${answerId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_ANSWER, payload: answerId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Answer
	const updateAnswer = async updatedAnswer => {
		try {
			const response = await axios.put(`${apiURL}/answer/${updatedAnswer._id}`, updatedAnswer)
			if (response.data.success) {
				dispatch({ type: UPDATE_ANSWER, payload: response.data.answer })
				console.log(response.data.answer);
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, messageAnswer: 'server error' }
		}
	}

	const [showAddAnswerModal, setShowAddAnswerModal] = useState(false);
	const [showDeleteAnswerModal, setShowDeleteAnswerModal] = useState(false);
	const [showUpdateAnswerModal, setShowUpdateAnswerModal] = useState(false);

	const answerContextData = {
		answerState,
		getAnswer,
		showAddAnswerModal,
		setShowAddAnswerModal,
		addAnswer,
		deleteAnswer,
		showDeleteAnswerModal,
		setShowDeleteAnswerModal,
		updateAnswer,
		findAnswerId,
		showUpdateAnswerModal,
		setShowUpdateAnswerModal,
		toastAnswer,
		setToastAnswer,
	}

	return (
		<AnswerContext.Provider value={answerContextData}>
			{children}
		</AnswerContext.Provider>
	)

}

export default AnswerContextProvider;
