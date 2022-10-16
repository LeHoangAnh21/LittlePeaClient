import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { subCommentReducer } from '~/actions/reducers/subCommentReducer'
import axios from 'axios';
import {
	GET_SUB_COMMENT,
	ADD_SUB_COMMENT,
	DELETE_SUB_COMMENT,
	UPDATE_SUB_COMMENT,
	FIND_SUB_COMMENT_ID,
} from './constant';

export const SubCommentContext = createContext()

const SubCommentContextProvider = ({ children }) => {

	const [subCommentState, dispatch] = useReducer(subCommentReducer, {
		subComment: null,
		subComments: [],
		subCommentsLoading: true
	})

	//Get SubComments
	const getSubComment = async () => {
		try {
			const response = await axios.get(`${apiURL}/sub-comment`)
			if (response) {
				dispatch({ type: GET_SUB_COMMENT, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add SubComment
	const addSubComment = async newSubComment => {
		try {
			const response = await axios.post(`${apiURL}/sub-comment/create`, newSubComment)

			if (response.data.success) {
				dispatch({ type: ADD_SUB_COMMENT, payload: response.data.subComment })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find SubComment id
	const findSubCommentId = subCommentId => {
		const subComment = subCommentState.subComments.find(subComment => subComment._id === subCommentId)
		dispatch({ type: FIND_SUB_COMMENT_ID, payload: subComment })
	}

	//Delete SubComment
	const deleteSubComment = async subCommentId => {
		try {
			const response = await axios.delete(`${apiURL}/sub-comment/${subCommentId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_SUB_COMMENT, payload: subCommentId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update SubComment
	const updateSubComment = async updatedSubComment => {
		try {
			const response = await axios.put(`${apiURL}/sub-comment/${updatedSubComment._id}`, updatedSubComment)
			if (response.data.success) {
				dispatch({ type: UPDATE_SUB_COMMENT, payload: response.data.subComment })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showSubCommentModal, setShowSubCommentModal] = useState(false);
	const [showAddSubCommentModal, setShowAddSubCommentModal] = useState(false);
	const [showUpdateSubCommentModal, setShowUpdateSubCommentModal] = useState(false);

	const subCommentContextData = {
		subCommentState,
		getSubComment,
		showSubCommentModal,
		setShowSubCommentModal,
		showAddSubCommentModal,
		setShowAddSubCommentModal,
		addSubComment,
		deleteSubComment,
		updateSubComment,
		findSubCommentId,
		showUpdateSubCommentModal,
		setShowUpdateSubCommentModal,
	}

	return (
		<SubCommentContext.Provider value={subCommentContextData}>
			{children}
		</SubCommentContext.Provider>
	)

}

export default SubCommentContextProvider;
