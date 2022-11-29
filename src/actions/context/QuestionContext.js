import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { questionReducer } from '~/actions/reducers/questionReducer'
import axios from 'axios';
import {
	GET_QUESTION,
	ADD_QUESTION,
	DELETE_QUESTION,
	UPDATE_QUESTION,
	FIND_QUESTION_ID
} from './constant';

export const QuestionContext = createContext()

const QuestionContextProvider = ({ children }) => {

	const [questionState, dispatch] = useReducer(questionReducer, {
		question: null,
		questions: [],
		questionsLoading: true
	})

	const [toastQuestion, setToastQuestion] = useState({
		showToastQuestion: false,
		messageQuestion: '',
		typeToastQuestion: null
	})

	//Get Questions
	const getQuestions = async () => {
		try {
			const response = await axios.get(`${apiURL}/question`)
			if (response) {
				dispatch({ type: GET_QUESTION, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, messageQuestion: 'server error' }
		}
	}

	//Add Question
	const addQuestion = async newQuestion => {
		try {
			const response = await axios.post(`${apiURL}/question/create`, newQuestion)

			if (response.data.success) {
				dispatch({ type: ADD_QUESTION, payload: response.data.question })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, messageQuestion: 'server error' }
		}

	}

	//Find Question id
	const findQuestionId = questionId => {
		const question = questionState.questions.find(question => question._id === questionId)
		dispatch({ type: FIND_QUESTION_ID, payload: question })
	}

	//Delete Question
	const deleteQuestion = async questionId => {
		try {
			const response = await axios.delete(`${apiURL}/question/${questionId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_QUESTION, payload: questionId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Question
	const updateQuestion = async updatedQuestion => {
		try {
			const response = await axios.put(`${apiURL}/question/${updatedQuestion._id}`, updatedQuestion)
			if (response.data.success) {
				dispatch({ type: UPDATE_QUESTION, payload: response.data.question })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, messageQuestion: 'server error' }
		}
	}

	const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
	const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
	const [showUpdateQuestionModal, setShowUpdateQuestionModal] = useState(false);

	const questionContextData = {
		questionState,
		getQuestions,
		showAddQuestionModal,
		setShowAddQuestionModal,
		addQuestion,
		deleteQuestion,
		showDeleteQuestionModal,
		setShowDeleteQuestionModal,
		updateQuestion,
		findQuestionId,
		showUpdateQuestionModal,
		setShowUpdateQuestionModal,
		toastQuestion,
		setToastQuestion,
	}

	return (
		<QuestionContext.Provider value={questionContextData}>
			{children}
		</QuestionContext.Provider>
	)

}

export default QuestionContextProvider;
