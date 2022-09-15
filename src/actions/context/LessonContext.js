import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { lessonReducer } from '~/actions/reducers/lessonReducer'
import axios from 'axios';
import {
	GET_LESSON,
	ADD_LESSON,
	DELETE_LESSON,
	UPDATE_LESSON,
	FIND_LESSON_ID
} from './constant';

export const LessonContext = createContext()

const LessonContextProvider = ({ children }) => {

	const [lessonState, dispatch] = useReducer(lessonReducer, {
		lesson: null,
		lessons: [],
		lessonsLoading: true
	})

	//Get lessons
	const getLessons = async () => {
		try {
			const response = await axios.get(`${apiURL}/lesson`)
			if (response) {
				dispatch({ type: GET_LESSON, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add lesson
	const addLesson = async newLesson => {
		try {
			const response = await axios.post(`${apiURL}/lesson/create`, newLesson)

			if (response.data.success) {
				dispatch({ type: ADD_LESSON, payload: response.data.lesson })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find lesson id
	const findLessonId = lessonId => {
		const lesson = lessonState.lessons.find(lesson => lesson._id === lessonId)
		dispatch({ type: FIND_LESSON_ID, payload: lesson })
	}

	//Delete Lesson
	const deleteLesson = async lessonId => {
		try {
			const response = await axios.delete(`${apiURL}/lesson/${lessonId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_LESSON, payload: lessonId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Lesson
	const updateLesson = async updatedLesson => {
		try {
			const response = await axios.put(`${apiURL}/lesson/${updatedLesson._id}`, updatedLesson)
			if (response.data.success) {
				dispatch({ type: UPDATE_LESSON, payload: response.data.lesson })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showAddLessonModal, setShowAddLessonModal] = useState(false);
	const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
	const [showUpdateLessonModal, setShowUpdateLessonModal] = useState(false);

	const lessonContextData = {
		lessonState,
		getLessons,
		showAddLessonModal,
		setShowAddLessonModal,
		addLesson,
		deleteLesson,
		showDeleteLessonModal,
		setShowDeleteLessonModal,
		updateLesson,
		findLessonId,
		showUpdateLessonModal,
		setShowUpdateLessonModal,
	}

	return (
		<LessonContext.Provider value={lessonContextData}>
			{children}
		</LessonContext.Provider>
	)

}

export default LessonContextProvider;
