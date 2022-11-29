import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { pointReducer } from '~/actions/reducers/pointReducer'
import axios from 'axios';
import {
	GET_POINT,
	ADD_POINT,
	FIND_POINT_ID
} from './constant';

export const PointContext = createContext()

const PointContextProvider = ({ children }) => {

	const [pointState, dispatch] = useReducer(pointReducer, {
		point: null,
		points: [],
		pointsLoading: true
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	const getPoints = async () => {
		try {
			const response = await axios.get(`${apiURL}/point`)
			if (response) {
				dispatch({ type: GET_POINT, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const addPoint = async newPoint => {
		try {
			const response = await axios.post(`${apiURL}/point/create`, newPoint)

			if (response.data.success) {
				dispatch({ type: ADD_POINT, payload: response.data.point })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	const findPointId = pointId => {
		const point = pointState.points.find(point => point._id === pointId)
		dispatch({ type: FIND_POINT_ID, payload: point })
	}

	const [showAddPointModal, setShowAddPointModal] = useState(false);

	const pointContextData = {
		pointState,
		getPoints,
		showAddPointModal,
		setShowAddPointModal,
		addPoint,
		findPointId,
		showToast,
		setShowToast,
	}

	return (
		<PointContext.Provider value={pointContextData}>
			{children}
		</PointContext.Provider>
	)

}

export default PointContextProvider;
