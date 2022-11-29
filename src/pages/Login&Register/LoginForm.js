import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '~/actions/context/AuthContext'

const LoginForm = () => {

	const {
		loginAccount,
		showLoginModal,
		setShowLoginModal,
		setShowToast
	} = useContext(AuthContext)

	// State
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const closeModal = () => {
		resetAddUserData()
	}

	const resetAddUserData = () => {
		setLoginForm({ username: '', password: '' })
		setShowLoginModal(false)
	}

	const login = async event => {
		event.preventDefault()

		try {
			const { success, message } = await loginAccount(loginForm)
			setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		} catch (error) {
			console.log(error)
		}


		resetAddUserData()
	}

	return (
		<Modal show={showLoginModal} onHide={closeModal}>

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
							onChange={onChangeLoginForm}
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
							onChange={onChangeLoginForm}
						/>

					</Form.Group><br />

				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Login
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default LoginForm;