import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { commentReducer } from '~/actions/reducers/commentReducer'
import axios from 'axios';
import {
	GET_COMMENT,
	ADD_COMMENT,
	DELETE_COMMENT,
	UPDATE_COMMENT,
	FIND_COMMENT_ID,
} from './constant';

export const CommentContext = createContext()

const CommentContextProvider = ({ children }) => {

	const [commentState, dispatch] = useReducer(commentReducer, {
		comment: null,
		comments: [],
		commentsLoading: true
	})

	//Get Comments
	const getComment = async () => {
		try {
			const response = await axios.get(`${apiURL}/comment`)
			if (response) {
				dispatch({ type: GET_COMMENT, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add Comment
	const addComment = async newComment => {
		try {
			const response = await axios.post(`${apiURL}/comment/create`, newComment)

			if (response.data.success) {
				dispatch({ type: ADD_COMMENT, payload: response.data.comment })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find Comment id
	const findCommentId = commentId => {
		const comment = commentState.comments.find(comment => comment._id === commentId)
		dispatch({ type: FIND_COMMENT_ID, payload: comment })
	}

	//Delete Comment
	const deleteComment = async commentId => {
		try {
			const response = await axios.delete(`${apiURL}/comment/${commentId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_COMMENT, payload: commentId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Comment
	const updateComment = async updatedComment => {
		try {
			const response = await axios.put(`${apiURL}/comment/${updatedComment._id}`, updatedComment)
			if (response.data.success) {
				dispatch({ type: UPDATE_COMMENT, payload: response.data.comment })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showCommentModal, setShowCommentModal] = useState(false);
	const [showAddCommentModal, setShowAddCommentModal] = useState(false);
	const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false);

	const commentContextData = {
		commentState,
		getComment,
		showCommentModal,
		setShowCommentModal,
		showAddCommentModal,
		setShowAddCommentModal,
		addComment,
		deleteComment,
		updateComment,
		findCommentId,
		showUpdateCommentModal,
		setShowUpdateCommentModal,
	}

	return (
		<CommentContext.Provider value={commentContextData}>
			{children}
		</CommentContext.Provider>
	)

}

export default CommentContextProvider;
