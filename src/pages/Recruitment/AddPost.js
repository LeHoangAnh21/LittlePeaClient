import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { RecruitmentContext } from '~/actions/context/RecruitmentContext'

const AddRecruitmentModal = () => {

	const {
		showAddRecruitmentModal,
		setShowAddRecruitmentModal,
		addRecruitment,
	} = useContext(RecruitmentContext)

	// State
	const [newRecruitment, setNewRecruitment] = useState({
		title: '',
		content: '',
		image: '',
	})

	const { title, content, image, } = newRecruitment

	const onChangeNewRecruitment = (e) =>
		setNewRecruitment({ ...newRecruitment, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddRecruitmentData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addRecruitment(newRecruitment)
		resetAddRecruitmentData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddRecruitmentData = () => {
		setNewRecruitment({ name: '', description: '', image: '', category: '' })
		setShowAddRecruitmentModal(false)
	}

	return (
		<Modal show={showAddRecruitmentModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Recruitment</Modal.Title>
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
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Content'
							name='content'
							value={content}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setNewRecruitment({ ...newRecruitment, image: base64 })}
						// onChange={onChangeNewRecruitment}
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

export default AddRecruitmentModal;