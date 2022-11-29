import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext'
import { AuthContext } from '~/actions/context/AuthContext';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'

const AddLesson = () => {

	const { id } = useParams();
	const courseId = id;

	const {
		authState: { user: { _id } },
	} = useContext(AuthContext)

	const {
		courseState: { courses, },
		getCourses,
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	const courseList = []

	courses.map(course => {
		if(course.user === _id){
			courseList.push(course)
		}
	})

	const {
		getLessons,
		showAddLessonModal,
		setShowAddLessonModal,
		addLesson,
		setShowToast
	} = useContext(LessonContext)

	useEffect(() => {
		getLessons()
	}, [])

	// State
	const [newLesson, setNewLesson] = useState({
		title: '',
		description: '',
		videoId: '',
		course: courseId,
	})

	useEffect(() => setNewLesson({ title: '', description: '', videoId: '', course: courseId }), [courseId])

	const { title, description, videoId, course } = newLesson

	const onChangeNewLesson = (e) =>
		setNewLesson({ ...newLesson, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddLessonData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addLesson(newLesson)
		resetAddLessonData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddLessonData = () => {
		setNewLesson({ title: '', description: '', videoId: '', course: courseId })
		setShowAddLessonModal(false)
	}

	return (
		<Modal show={showAddLessonModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD LESSON</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>
					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Title (*Required)'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewLesson}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewLesson}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Video ID'
							name='videoId'
							aria-describedby='title-help'
							value={videoId}
							onChange={onChangeNewLesson}
						/>

					</Form.Group><br />

				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Submit
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default AddLesson;