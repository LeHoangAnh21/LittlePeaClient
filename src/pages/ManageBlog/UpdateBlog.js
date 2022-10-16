import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { BlogContext } from '~/actions/context/BlogContext'
import { CategoryContext } from '~/actions/context/CategoryContext';

const UpdateBlogModal = () => {

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const {
		blogState: { blog, blogs, blogsLoading },
		updateBlog,
		showUpdateBlogModal,
		setShowUpdateBlogModal,
	} = useContext(BlogContext)

	// State
	const [updatedBlog, setUpdatedBlog] = useState(blog)

	useEffect(() => setUpdatedBlog(blog), [blog])

	const { title, content, image, category } = updatedBlog
	const onUpdateBlog = (e) =>
		setUpdatedBlog({ ...updatedBlog, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedBlog(blog)
		setShowUpdateBlogModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateBlog(updatedBlog)
		setShowUpdateBlogModal(false)
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateBlogModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE Blog</Modal.Title>
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
							onChange={onUpdateBlog}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Content'
							name='content'
							value={content}
							onChange={onUpdateBlog}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setUpdatedBlog({ ...updatedBlog, image: base64 })}
						// onChange={onUpdateBlog}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={category}
							name='category'
							onChange={onUpdateBlog}
							disabled
						>
							<option>Category</option>
							{categories.map((category) => (
								<option value={category._id} key={category._id}>{category.title}</option>
							))}

						</Form.Control>
					</Form.Group>

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

export default UpdateBlogModal;