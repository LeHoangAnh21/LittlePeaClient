import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { BlogContext } from '~/actions/context/BlogContext'

const DeleteBlogModal = () => {

	const {
		blogState: { blog, },
		deleteBlog,
		showDeleteBlogModal,
		setShowDeleteBlogModal,
	} = useContext(BlogContext)

	// State
	const [deletedBlog, setDeletedBlog] = useState(blog)

	useEffect(() => setDeletedBlog(blog), [blog])

	const closeModal = () => {
		setShowDeleteBlogModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteBlogModal(false)
	}

	return (
		<Modal show={showDeleteBlogModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this Blog?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Blog title: {blog.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteBlog.bind(this, blog._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteBlogModal;

