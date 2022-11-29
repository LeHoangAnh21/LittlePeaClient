import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { BlogContext } from '~/actions/context/BlogContext'
import { CategoryContext } from '~/actions/context/CategoryContext';

const AddBlogModal = () => {

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const { 
		blogState: { blog, blogs, blogsLoading },
		showAddBlogModal, 
		setShowAddBlogModal, 
		addBlog,
		setShowToast
	} = useContext(BlogContext)

	// State
	const [newBlog, setNewBlog] = useState({
		title: '',
		content: '',
		image: '',
		status: 'Public',
		category: '',
	})

	const { title, content, image, category } = newBlog

	const onChangeNewBlog = (e) =>
		setNewBlog({ ...newBlog, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddBlogData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addBlog(newBlog)
		resetAddBlogData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddBlogData = () => {
		setNewBlog({ name: '', description: '', image: '', status: 'Public', category: '' })
		setShowAddBlogModal(false)
	}

	return (
		<Modal show={showAddBlogModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Blog</Modal.Title>
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
							onChange={onChangeNewBlog}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Content'
							name='content'
							value={content}
							onChange={onChangeNewBlog}
						/>

					</Form.Group><br /><br />

					<Form.Group>
						
						<FileBase64 
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setNewBlog({ ...newBlog, image: base64 })}
							// onChange={onChangeNewBlog}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={category}
							name='category'
							onChange={onChangeNewBlog}
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

export default AddBlogModal;