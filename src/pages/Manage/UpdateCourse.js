// import { Fragment } from 'react'
import { CourseContext } from '~/actions/context/CourseContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FileBase64 from 'react-file-base64';


function UpdateCourse() {

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])


	const {
		courseState: { course, courses },
		updateCourse,
		showUpdateCourseModal,
		setShowUpdateCourseModal,
	} = useContext(CourseContext)

	//UPDATE COURSE
	// State
	const [updatedCourse, setUpdatedCourse] = useState(course)

	useEffect(() => setUpdatedCourse(course), [course])

	const { name, description, image, category } = updatedCourse

	const onUpdateCourse = (e) =>
		setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedCourse(course)
		setShowUpdateCourseModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCourse(updatedCourse)
		setShowUpdateCourseModal(false)
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddCourseData = () => {
	// 	setUpdatedCourse({ name: '', description: '', image: '' })
	// 	setShowUpdateCourseModal(false)
	// }

	console.log(category._id);

	return (
		<Modal show={showUpdateCourseModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE COURSE</Modal.Title>
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
							onChange={onUpdateCourse}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onUpdateCourse}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setUpdatedCourse({ ...updatedCourse, image: base64 })}
						// onChange={onUpdateCourse}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={category}
							name='category'
							onChange={onUpdateCourse}
							disabled
						>
							<option>Category</option>
							{categories.map((category) => (
								<option value={category._id} key={category._id}>{category.title}</option>
							))}

						</Form.Control>
					</Form.Group>

				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal}>
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Submit
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	);
}

export default UpdateCourse;