import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CategoryContext } from '~/actions/context/CategoryContext'

const UpdateCategoryModal = () => {

	const {
		categoryState: { category, categories, categoriesLoading },
		updateCategory,
		showUpdateCategoryModal,
		setShowUpdateCategoryModal,
	} = useContext(CategoryContext)

	// State
	const [updatedCategory, setUpdatedCategory] = useState(category)

	useEffect(() => setUpdatedCategory(category), [category])

	const { title, description, } = updatedCategory

	const onUpdateCategory = (e) =>
		setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedCategory(category)
		setShowUpdateCategoryModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCategory(updatedCategory)
		setShowUpdateCategoryModal(false)
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// console.log(category._id);

	return (
		<Modal show={showUpdateCategoryModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Update Category</Modal.Title>
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
							onChange={onUpdateCategory}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onUpdateCategory}
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

export default UpdateCategoryModal;
