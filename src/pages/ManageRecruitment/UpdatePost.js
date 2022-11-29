import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FileBase64 from 'react-file-base64';
import { useContext, useState, useEffect } from 'react'
import { RecruitmentContext } from '~/actions/context/RecruitmentContext'
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { Fragment } from 'react';

const UpdateRecruitmentModal = () => {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const {
		recruitmentState: { recruitment, },
		updateRecruitment,
		showUpdateRecruitmentModal,
		setShowUpdateRecruitmentModal,
		setShowToast
	} = useContext(RecruitmentContext)

	// State
	const [updatedRecruitment, setUpdatedRecruitment] = useState(recruitment)

	useEffect(() => setUpdatedRecruitment(recruitment), [recruitment])

	const { title,
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
		status,
		image 
	} = updatedRecruitment

	const onUpdateRecruitment = (e) =>
		setUpdatedRecruitment({ ...updatedRecruitment, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedRecruitment(recruitment)
		setShowUpdateRecruitmentModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateRecruitment(updatedRecruitment)
		setShowUpdateRecruitmentModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateRecruitmentModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE Recruitment</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>

					<Form.Group>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={onUpdateRecruitment}
						>
							<option value='Hide' key='1'>Hide</option>
							<option value='Public' key='2'>Public</option>
						</Form.Control>
					</Form.Group> 

					<br />

					{role !== 'admin' && 
						<Fragment>
							<Form.Group>
		
								<Form.Control
									type='text'
									placeholder='Title (*Required)'
									name='title'
									required
									aria-describedby='title-help'
									value={title}
									onChange={onUpdateRecruitment}
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
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
		
								<Form.Label>Avatar of your company</Form.Label>
		
								<FileBase64
									accept='image/*'
									multiple={false}
									type='file'
									value={avatarCompany}
									onDone={({ base64 }) => setUpdatedRecruitment({ ...updatedRecruitment, avatarCompany: base64 })}
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
									onChange={onUpdateRecruitment}
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
									onChange={onUpdateRecruitment}
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
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
		
								<Form.Control
									type='text'
									placeholder='Salary'
									name='salary'
									aria-describedby='title-help'
									value={salary}
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
		
								<Form.Control
									type='number'
									placeholder='Number of Recruiting'
									name='numberRecruiting'
									aria-describedby='title-help'
									value={numberRecruiting}
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
		
								<Form.Control
									type='text'
									placeholder='Experience'
									name='experience'
									aria-describedby='title-help'
									value={experience}
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
		
								<Form.Control
									type='date'
									placeholder='Application deadline'
									name='deadline'
									aria-describedby='title-help'
									value={deadline}
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
		
								<Form.Control
									type='text'
									placeholder='Location'
									name='location'
									aria-describedby='title-help'
									value={location}
									onChange={onUpdateRecruitment}
								/>
		
							</Form.Group> <br />
		
							<Form.Group>
								<Form.Control
									as='select'
									value={category}
									name='category'
									onChange={onUpdateRecruitment}
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
									onDone={({ base64 }) => setUpdatedRecruitment({ ...updatedRecruitment, image: base64 })}
								/>
		
							</Form.Group> <br />
						</Fragment>
					}

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

export default UpdateRecruitmentModal;