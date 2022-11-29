// import { Fragment } from 'react'
import { CourseContext } from '~/actions/context/CourseContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FileBase64 from 'react-file-base64';
import { Fragment } from 'react';


function UpdateCourse() {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

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
		setShowToast
	} = useContext(CourseContext)

	//UPDATE COURSE
	// State
	const [updatedCourse, setUpdatedCourse] = useState(course)

	useEffect(() => setUpdatedCourse(course), [course])

	const { name, description, image, category, status } = updatedCourse

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
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateCourseModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE COURSE</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>

					<Form.Group>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={onUpdateCourse}
						>
							<option value='Hide' key='1'>Hide</option>
							<option value='Public' key='2'>Public</option>
						</Form.Control>
					</Form.Group> <br />

					{role !== 'admin' && 
						<Fragment>
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
								
							</Form.Group><br />
						</Fragment>
					
					}

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