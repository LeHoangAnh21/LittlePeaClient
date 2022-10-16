import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '~/actions/context/AuthContext'

const LoginForm = () => {

	const {
		registerAccount,
		showRegisterModal,
		setShowRegisterModal,
	} = useContext(AuthContext)

	// State
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '', 
		fullname: '',
		role: '', 
		avatar: ''
	})


	const { username, password, fullname, role, avatar } = registerForm

	const onChangeRegisterForm = event =>
		setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

	const closeModal = () => {
		resetAddUserData()
	}

	const resetAddUserData = () => {
		setRegisterForm({ username: '', password: '', fullname: '', role: '', avatar: ''})
		setShowRegisterModal(false)
	}

	const login = async event => {
		event.preventDefault()

		try {
			await registerAccount(registerForm)
		} catch (error) {
			console.log(error)
		}

		resetAddUserData()
	}

	return (
		<Modal show={showRegisterModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>

			<Form onSubmit={login} >
				<Modal.Body>
					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Username'
							name='username'
							required
							aria-describedby='title-help'
							value={username}
							onChange={onChangeRegisterForm}
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
							onChange={onChangeRegisterForm}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Fullname'
							name='fullname'
							required
							aria-describedby='title-help'
							value={fullname}
							onChange={onChangeRegisterForm}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={role}
							name='role'
							required
							onChange={onChangeRegisterForm}
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
							required
							onDone={({ base64 }) => setRegisterForm({ ...registerForm, avatar: base64 })}
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

export default LoginForm;