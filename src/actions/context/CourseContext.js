import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { courseReducer } from '~/actions/reducers/courseReducer'
import axios from 'axios';
import {
	GET_COURSE,
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	FIND_COURSE_ID
} from './constant';

export const CourseContext = createContext()

const CourseContextProvider = ({ children }) => {

	const [courseState, dispatch] = useReducer(courseReducer, {
		course: null,
		courses: [],
		coursesLoading: true
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//Get courses
	const getCourses = async () => {
		try {
			const response = await axios.get(`${apiURL}/courses`)
			if (response) {
				dispatch({ type: GET_COURSE, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add course
	const addCourse = async newCourse => {
		try {
			const response = await axios.post(`${apiURL}/courses/create`, newCourse)

			if (response.data.success) {
				dispatch({ type: ADD_COURSE, payload: response.data.course })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find Course id
	const findCourseId = courseId => {
		const course = courseState.courses.find(course => course._id === courseId)
		dispatch({ type: FIND_COURSE_ID, payload: course })
	}

	//Delete Course
	const deleteCourse = async courseId => {
		try {
			const response = await axios.delete(`${apiURL}/courses/${courseId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_COURSE, payload: courseId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Course
	const updateCourse = async updatedCourse => {
		try {
			const response = await axios.put(`${apiURL}/courses/${updatedCourse._id}`, updatedCourse)
			if (response.data.success) {
				dispatch({ type: UPDATE_COURSE, payload: response.data.course })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showAddCourseModal, setShowAddCourseModal] = useState(false);
	const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
	const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
	// const [viewCourseId, setViewCourseId] = useState('');

	const courseContextData = {
		courseState,
		getCourses,
		showAddCourseModal,
		setShowAddCourseModal,
		addCourse,
		deleteCourse,
		showDeleteCourseModal,
		setShowDeleteCourseModal,
		updateCourse,
		findCourseId,
		showUpdateCourseModal,
		setShowUpdateCourseModal,
		showToast,
		setShowToast,
	}

	return (
		<CourseContext.Provider value={courseContextData}>
			{children}
		</CourseContext.Provider>
	)

}

export default CourseContextProvider;
