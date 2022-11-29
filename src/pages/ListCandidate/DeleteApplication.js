import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ApplicationContext } from '~/actions/context/ApplicationContext'

const DeleteApplicationModal = () => {

	const {
		applicationState: { application, },
		deleteApplication,
		showDeleteApplicationModal,
		setShowDeleteApplicationModal,
	} = useContext(ApplicationContext)

	// State
	const [deletedApplication, setDeletedApplication] = useState(application)

	useEffect(() => setDeletedApplication(application), [application])

	const closeModal = () => {
		setShowDeleteApplicationModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteApplicationModal(false)
	}

	return (
		<Modal show={showDeleteApplicationModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this candidate?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Application title: {application.name}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteApplication.bind(this, application._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteApplicationModal;


