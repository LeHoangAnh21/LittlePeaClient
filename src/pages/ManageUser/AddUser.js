import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '~/actions/context/UserContext'

const AddUserModal = () => {

	const {
		showAddUserModal,
		setShowAddUserModal,
		addUser,
	} = useContext(UserContext)

	// State
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
		role: '',
		avatar: '',
	})

	const { name, email, password, role, avatar } = newUser

	const onChangeNewUser = (e) =>
		setNewUser({ ...newUser, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddUserData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addUser(newUser)
		resetAddUserData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddUserData = () => {
		setNewUser({ name: '', email: '', password: '', role: '', avatar: '' })
		setShowAddUserModal(false)
	}

	return (
		<Modal show={showAddUserModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Register</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>
					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Name'
							name='name'
							required
							aria-describedby='title-help'
							value={name}
							onChange={onChangeNewUser}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Email'
							name='email'
							required
							aria-describedby='title-help'
							value={email}
							onChange={onChangeNewUser}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							type='password'
							placeholder='Password'
							name='password'
							required
							aria-describedby='title-help'
							value={password}
							onChange={onChangeNewUser}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={role}
							name='role'
							onChange={onChangeNewUser}
						>
							<option>Role</option>
							<option value='creator'>Creator</option>
							<option value='student'>Student</option>
							<option value='recruitment'>Recruitment</option>

						</Form.Control>
					</Form.Group><br />

					<Form.Group>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={avatar}
							onDone={({ base64 }) => setNewUser({ ...newUser, avatar: base64 })}
						// onChange={onChangeNewUser}
						/>

					</Form.Group><br />

				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Register 
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default AddUserModal;
