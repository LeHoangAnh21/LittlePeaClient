import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CategoryContext } from '~/actions/context/CategoryContext'

const DeleteCategoryModal = () => {

	const {
		categoryState: { category, categories, categoriesLoading },
		deleteCategory,
		showDeleteCategoryModal,
		setShowDeleteCategoryModal,
	} = useContext(CategoryContext)

	// State
	const [deletedCategory, setDeletedCategory] = useState(category)

	useEffect(() => setDeletedCategory(category), [category])

	const closeModal = () => {
		setShowDeleteCategoryModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteCategoryModal(false)
	}

	return (
		<Modal show={showDeleteCategoryModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this category?</Modal.Title>
				
			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Category title: {category.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteCategory.bind(this, category._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteCategoryModal;

