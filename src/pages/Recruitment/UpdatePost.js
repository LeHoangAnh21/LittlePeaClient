import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { RecruitmentContext } from '~/actions/context/RecruitmentContext'

const UpdateRecruitmentModal = () => {

	const {
		recruitmentState: { recruitment, },
		updateRecruitment,
		showUpdateRecruitmentModal,
		setShowUpdateRecruitmentModal,
	} = useContext(RecruitmentContext)

	// State
	const [updatedRecruitment, setUpdatedRecruitment] = useState(recruitment)

	useEffect(() => setUpdatedRecruitment(recruitment), [recruitment])

	const { title, content, image, } = updatedRecruitment

	const onUpdateRecruitment = (e) =>
		setUpdatedRecruitment({ ...updatedRecruitment, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedRecruitment(recruitment)
		setShowUpdateRecruitmentModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateRecruitment(updatedRecruitment)
		setShowUpdateRecruitmentModal(false)
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateRecruitmentModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE Recruitment</Modal.Title>
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
							onChange={onUpdateRecruitment}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Content'
							name='content'
							value={content}
							onChange={onUpdateRecruitment}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setUpdatedRecruitment({ ...updatedRecruitment, image: base64 })}
						// onChange={onUpdateRecruitment}
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

export default UpdateRecruitmentModal;