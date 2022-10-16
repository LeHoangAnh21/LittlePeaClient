import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { TestContext } from '~/actions/context/TestContext'

const DeleteTestModal = () => {

	const {
		testState: { test },
		deleteTest,
		showDeleteTestModal,
		setShowDeleteTestModal,
	} = useContext(TestContext)

	// State
	const [deletedTest, setDeletedTest] = useState(test)

	useEffect(() => setDeletedTest(test), [test])

	const closeModal = () => {
		setShowDeleteTestModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteTestModal(false)
	}

	return (
		<Modal show={showDeleteTestModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this Test?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Test title: {test.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteTest.bind(this, test._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteTestModal;

