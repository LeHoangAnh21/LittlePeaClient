import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'
import { TestContext } from '~/actions/context/TestContext';

const AddTestModal = () => {

	const { id } = useParams();

	const courseId = id;

	const { 
		showAddTestModal, 
		setShowAddTestModal, 
		addTest,
		setToastTest
	} = useContext(TestContext)

	// State
	const [newTest, setNewTest] = useState({
		title: '',
		description: '',
		course: courseId,
	})

	const { title, description, course } = newTest

	const onChangeNewTest = (e) =>
		setNewTest({ ...newTest, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddTestData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, messageToastTest } = await addTest(newTest)
		resetAddTestData()
		setToastTest({ showToastTest: true, messageToastTest, typeToastTest: success ? 'success' : 'danger' })
	}

	const resetAddTestData = () => {
		setNewTest({ title: '', description: '', course: courseId })
		setShowAddTestModal(false)
	}

	return (
		<Modal show={showAddTestModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Test</Modal.Title>
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
							onChange={onChangeNewTest}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewTest}
						/>

					</Form.Group><br />

					{/* <Form.Group>

						<Form.Control
							as='select'
							name='course'
							value={course}
							onChange={onChangeNewTest}
							disabled
						>
							<option value={course}>{courseName}</option>
						</Form.Control>

					</Form.Group><br /> */}

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

export default AddTestModal;