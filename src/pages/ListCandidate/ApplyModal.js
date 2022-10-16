import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { ApplicationContext } from '~/actions/context/ApplicationContext'

const ApplyModal = ({ data }) => {

	const {
		showAddApplicationModal,
		setShowAddApplicationModal,
		addApplication,
	} = useContext(ApplicationContext)

	// State
	const [newApplication, setNewApplication] = useState({
		name: '',
		description: '',
		imageCV: '',
		recruitment: data,
	})

	const { name, description, imageCV, recruitment, } = newApplication

	const onChangeNewApplication = (e) =>
		setNewApplication({ ...newApplication, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddApplicationData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addApplication(newApplication)
		resetAddApplicationData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddApplicationData = () => {
		setNewApplication({ name: '', description: '', imageCV: '', recruitment: data, })
		setShowAddApplicationModal(false)
	}

	return (
		<Modal show={showAddApplicationModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>APPLY MODAL</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>
					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Fullname'
							name='name'
							required
							aria-describedby='title-help'
							value={name}
							onChange={onChangeNewApplication}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewApplication}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={imageCV}
							onDone={({ base64 }) => setNewApplication({ ...newApplication, imageCV: base64 })}
						// onChange={onChangeNewApplication}
						/>

					</Form.Group><br /><br />

					<Form.Group style={{ display: 'none' }}>

						<Form.Control
							type='text'
							name='recruitment'
							aria-describedby='title-help'
							value={recruitment}
							onChange={onChangeNewApplication}
							disabled
						/>

					</Form.Group><br /><br />

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

export default ApplyModal;