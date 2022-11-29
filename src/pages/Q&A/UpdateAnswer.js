import { AnswerContext } from '~/actions/context/AnswerContext';
import { QuestionContext } from '~/actions/context/QuestionContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'

const UpdateAnswer = () => {

	const {
		questionState: { questions },
		getQuestions,
	} = useContext(QuestionContext)

	useEffect(() => {
		getQuestions()
	}, [])

	const {
		answerState: { answer },
		updateAnswer,
		showUpdateAnswerModal,
		setShowUpdateAnswerModal,
		setToastAnswer
	} = useContext(AnswerContext)

	// State
	const [updatedAnswer, setUpdatedAnswer] = useState(answer)

	useEffect(() => setUpdatedAnswer(answer), [answer])

	const { title, isTrue, questionId } = updatedAnswer

	const onUpdateAnswer = (e) =>
		setUpdatedAnswer({ ...updatedAnswer, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedAnswer(answer)
		setShowUpdateAnswerModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, messageAnswer } = await updateAnswer(updatedAnswer)
		setShowUpdateAnswerModal(false)
		setToastAnswer({ showToastAnswer: true, messageAnswer, typeToastAnswer: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateAnswerModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE Answer</Modal.Title>
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
							onChange={onUpdateAnswer}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='select'
							name='isTrue'
							value={isTrue}
							onChange={onUpdateAnswer}
						>
							<option value="true" key="true">True</option>
							<option value="false" key="false">False</option>
						</Form.Control>

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

export default UpdateAnswer;