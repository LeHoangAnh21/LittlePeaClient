import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect, Fragment } from 'react'
import { UserContext } from '~/actions/context/UserContext'

const UpdateRecruitmentModal = () => {

	const {
		userState: { user },
		updateUser,
		showUpdateUserModal,
		setShowUpdateUserModal,
	} = useContext(UserContext)

	// State
	const [updatedUser, setUpdatedUser] = useState(user)

	useEffect(() => setUpdatedUser(user), [user])

	const { username, password, fullname, role, workplace, email, activation, time, avatar } = updatedUser

	const onUpdateUser = (e) =>
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedUser(user)
		setShowUpdateUserModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateUser(updatedUser)
		setShowUpdateUserModal(false)
	}

	return (
		<Modal show={showUpdateUserModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE User</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>
					{/* <Form.Group>

						<Form.Check
							type='radio'
							name='activation'
							aria-describedby='title-help'
							value={activation}
							label="activated"
							onChange={onUpdateUser}
							checked
						/>

						<Form.Check
							type='radio'
							name='activation'
							aria-describedby='title-help'
							value={activation}
							label="blocked"
							onChange={onUpdateUser}
						/>

					</Form.Group><br /> */}

					<Form.Label>Options</Form.Label>
					<Form.Group>
						<Form.Control
							as='select'
							value={activation}
							name='activation'
							onChange={onUpdateUser}
						>
							<option>Options</option>
							<option value='activated' key='activated'>Activated</option>
							<option value='blocked' key='blocked'>Blocked</option>
						</Form.Control>
					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='date'
							name='time'
							aria-describedby='title-help'
							value={time}
							onChange={onUpdateUser}
						/>

					</Form.Group> <br />

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
