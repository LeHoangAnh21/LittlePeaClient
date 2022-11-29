import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CategoryContext } from '~/actions/context/CategoryContext'

const AddCategoryModal = () => {

	const {
		categoryState: { category, categories, categoriesLoading },
		showAddCategoryModal,
		setShowAddCategoryModal,
		addCategory,
		setShowToast	
	} = useContext(CategoryContext)

	// State
	const [newCategory, setNewCategory] = useState({
		title: '',
		description: '',
	})

	const { title, description,} = newCategory

	const onChangeNewCategory = (e) =>
		setNewCategory({ ...newCategory, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddCategoryData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addCategory(newCategory)
		resetAddCategoryData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddCategoryData = () => {
		setNewCategory({ name: '', description: '', image: '', category: '' })
		setShowAddCategoryModal(false)
	}

	return (
		<Modal show={showAddCategoryModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Category</Modal.Title>
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
							onChange={onChangeNewCategory}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewCategory}
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

export default AddCategoryModal;
