import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { RecruitmentContext } from '~/actions/context/RecruitmentContext'
import { CategoryContext } from '~/actions/context/CategoryContext';

const AddRecruitmentModal = () => {

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const {
		showAddRecruitmentModal,
		setShowAddRecruitmentModal,
		addRecruitment,
	} = useContext(RecruitmentContext)

	// State
	const [newRecruitment, setNewRecruitment] = useState({
		title: '',
		company: '',
		avatarCompany: '',
		jobDescription: '',
		requirementsCandidates: '',
		benefitsCandidates: '',
		salary: '',
		numberRecruiting: '',
		experience: '',
		deadline: '',
		location: '',
		category: '',
		image: '' 
	})

	const { 
		title,
		company,
		avatarCompany,
		jobDescription,
		requirementsCandidates,
		benefitsCandidates,
		salary,
		numberRecruiting,
		experience,
		deadline,
		location,
		category,
		image 
	} = newRecruitment

	const onChangeNewRecruitment = (e) =>
		setNewRecruitment({ ...newRecruitment, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddRecruitmentData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addRecruitment(newRecruitment)
		resetAddRecruitmentData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddRecruitmentData = () => {
		setNewRecruitment({
			title: '',
			company: '',
			avatarCompany: '',
			jobDescription: '',
			requirementsCandidates: '',
			benefitsCandidates: '',
			salary: '',
			numberRecruiting: '',
			experience: '',
			deadline: '',
			location: '',
			category: '',
			image: ''
		})
		setShowAddRecruitmentModal(false)
	}

	return (
		<Modal show={showAddRecruitmentModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Recruitment</Modal.Title>
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
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Company'
							name='company'
							required
							aria-describedby='title-help'
							value={company}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Label>Avatar of your company</Form.Label>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={avatarCompany}
							onDone={({ base64 }) => setNewRecruitment({ ...newRecruitment, avatarCompany: base64 })}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Job Description'
							name='jobDescription'
							value={jobDescription}
							required
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Requirements for Candidates'
							name='requirementsCandidates'
							value={requirementsCandidates}
							required
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Benefits for Candidates'
							name='benefitsCandidates'
							value={benefitsCandidates}
							required
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Salary'
							name='salary'
							aria-describedby='title-help'
							value={salary}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='number'
							placeholder='Number of Recruiting'
							name='numberRecruiting'
							aria-describedby='title-help'
							value={numberRecruiting}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Experience'
							name='experience'
							aria-describedby='title-help'
							value={experience}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='date'
							placeholder='Application deadline'
							name='deadline'
							aria-describedby='title-help'
							value={deadline}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Location'
							name='location'
							aria-describedby='title-help'
							value={location}
							onChange={onChangeNewRecruitment}
						/>

					</Form.Group> <br />

					<Form.Group>
						<Form.Control
							as='select'
							value={category}
							name='category'
							onChange={onChangeNewRecruitment}
						>
							<option>Category</option>
							{categories.map((category) => (
								<option value={category._id} key={category._id}>{category.title}</option>
							))}

						</Form.Control>
					</Form.Group> <br />

					<Form.Group>

						<Form.Label>Image for your post</Form.Label>

						<FileBase64
							accept='image/*'
							multiple={false}
							type='file'
							value={image}
							onDone={({ base64 }) => setNewRecruitment({ ...newRecruitment, image: base64 })}
						/>

					</Form.Group> <br />

				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Post
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default AddRecruitmentModal;