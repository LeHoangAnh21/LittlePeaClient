import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { recruitmentReducer } from '~/actions/reducers/recruitmentReducer'
import axios from 'axios';
import {
	GET_RECRUITMENT,
	ADD_RECRUITMENT,
	DELETE_RECRUITMENT,
	UPDATE_RECRUITMENT,
	FIND_RECRUITMENT_ID
} from './constant';

export const RecruitmentContext = createContext()

const RecruitmentContextProvider = ({ children }) => {

	const [recruitmentState, dispatch] = useReducer(recruitmentReducer, {
		recruitment: null,
		recruitments: [],
		recruitmentsLoading: true
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//Get recruitments
	const getRecruitment = async () => {
		try {
			const response = await axios.get(`${apiURL}/recruitment`)
			if (response) {
				dispatch({ type: GET_RECRUITMENT, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add recruitment
	const addRecruitment = async newRecruitment => {
		try {
			const response = await axios.post(`${apiURL}/recruitment/create`, newRecruitment)

			if (response.data.success) {
				dispatch({ type: ADD_RECRUITMENT, payload: response.data.recruitment })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find Recruitment id
	const findRecruitmentId = recruitmentId => {
		const recruitment = recruitmentState.recruitments.find(recruitment => recruitment._id === recruitmentId)
		dispatch({ type: FIND_RECRUITMENT_ID, payload: recruitment })
	}

	//Delete Recruitment
	const deleteRecruitment = async recruitmentId => {
		try {
			const response = await axios.delete(`${apiURL}/recruitment/${recruitmentId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_RECRUITMENT, payload: recruitmentId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Recruitment
	const updateRecruitment = async updatedRecruitment => {
		try {
			const response = await axios.put(`${apiURL}/recruitment/${updatedRecruitment._id}`, updatedRecruitment)
			if (response.data.success) {
				dispatch({ type: UPDATE_RECRUITMENT, payload: response.data.recruitment })
				console.log(response.data.recruitment);
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showAddRecruitmentModal, setShowAddRecruitmentModal] = useState(false);
	const [showDeleteRecruitmentModal, setShowDeleteRecruitmentModal] = useState(false);
	const [showUpdateRecruitmentModal, setShowUpdateRecruitmentModal] = useState(false);
	const [viewRecruitmentId, setViewRecruitmentId] = useState('');

	const recruitmentContextData = {
		recruitmentState,
		getRecruitment,
		showAddRecruitmentModal,
		setShowAddRecruitmentModal,
		addRecruitment,
		deleteRecruitment,
		showDeleteRecruitmentModal,
		setShowDeleteRecruitmentModal,
		updateRecruitment,
		findRecruitmentId,
		showUpdateRecruitmentModal,
		setShowUpdateRecruitmentModal,
		setViewRecruitmentId,
		viewRecruitmentId,
		showToast,
		setShowToast,
	}

	return (
		<RecruitmentContext.Provider value={recruitmentContextData}>
			{children}
		</RecruitmentContext.Provider>
	)

}

export default RecruitmentContextProvider;
