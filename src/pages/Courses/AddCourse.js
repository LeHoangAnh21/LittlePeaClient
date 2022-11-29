import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { CourseContext } from '~/actions/context/CourseContext'
import { CategoryContext } from '~/actions/context/CategoryContext';

const AddCourseModal = () => {

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const { 
		courseState: { course, courses, coursesLoading },
		showAddCourseModal, 
		setShowAddCourseModal, 
		addCourse,
		setShowToast
	} = useContext(CourseContext)

	// State
	const [newCourse, setNewCourse] = useState({
		name: '',
		description: '',
		image: '',
		category: '',
		status: 'Hide'
	})

	const { name, description, image, category, status } = newCourse

	const onChangeNewCourse = (e) =>
		setNewCourse({ ...newCourse, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddCourseData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addCourse(newCourse)
		resetAddCourseData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddCourseData = () => {
		setNewCourse({ name: '', description: '', image: '', category: '', status: 'Hide' })
		setShowAddCourseModal(false)
	}

	return (
		<Modal show={showAddCourseModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD COURSE</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>
					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Title (*Required)'
							name='name'
							required
							aria-describedby='title-help'
							value={name}
							onChange={onChangeNewCourse}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewCourse}
						/>

					</Form.Group><br /><br />

					<Form.Group>
						
						<FileBase64 
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setNewCourse({ ...newCourse, image: base64 })}
							// onChange={onChangeNewCourse}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={category}
							name='category'
							onChange={onChangeNewCourse}
						>
							<option>Category</option>
							{categories.map((category) => (
								<option value={category._id} key={category._id}>{category.title}</option>
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

export default AddCourseModal;