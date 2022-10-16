import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { RecruitmentContext } from '~/actions/context/RecruitmentContext'

const DeleteRecruitmentModal = () => {

	const {
		recruitmentState: { recruitment, },
		deleteRecruitment,
		showDeleteRecruitmentModal,
		setShowDeleteRecruitmentModal, 
	} = useContext(RecruitmentContext)

	// State
	const [deletedRecruitment, setDeletedRecruitment] = useState(recruitment)

	useEffect(() => setDeletedRecruitment(recruitment), [recruitment])

	const closeModal = () => {
		setShowDeleteRecruitmentModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteRecruitmentModal(false)
	}

	return (
		<Modal show={showDeleteRecruitmentModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this Recruitment?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Recruitment title: {recruitment.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteRecruitment.bind(this, recruitment._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteRecruitmentModal;

