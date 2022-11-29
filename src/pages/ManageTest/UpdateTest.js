import { TestContext } from '~/actions/context/TestContext';
import { CourseContext } from '~/actions/context/CourseContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'

const UpdateTest = () => {

	const {
		courseState: { courses, },
		getCourses,
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	const {
		testState: { test },
		updateTest,
		showUpdateTestModal,
		setShowUpdateTestModal,
		setToastTest
	} = useContext(TestContext)

	// State
	const [updatedTest, setUpdatedTest] = useState(test)

	useEffect(() => setUpdatedTest(test), [test])

	const { title, description, course } = updatedTest

	const onUpdateTest = (e) =>
		setUpdatedTest({ ...updatedTest, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedTest(test)
		setShowUpdateTestModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, messageToastTest } = await updateTest(updatedTest)
		setShowUpdateTestModal(false)
		setToastTest({ showToastTest: true, messageToastTest, typeToastTest: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateTestModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE TEST</Modal.Title>
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
							onChange={onUpdateTest}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onUpdateTest}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={course}
							name='course'
							onChange={onUpdateTest}
							disabled
						>
							<option>Course</option>
							{courses.map((course) => (
								<option value={course._id} key={course._id}>{course.name}</option>
							))}

						</Form.Control>
					</Form.Group>

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

export default UpdateTest;