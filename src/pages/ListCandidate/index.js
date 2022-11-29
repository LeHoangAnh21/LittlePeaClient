import classNames from 'classnames/bind'
import styles from './ListCandidate.module.scss'
import { useEffect, useContext, useState } from 'react';
import { ApplicationContext } from '~/actions/context/ApplicationContext';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { Fragment } from 'react';
import ManageCandidate from '~/component/ManageCandidate';
import DeleteApplicationModal from './DeleteApplication';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import moment from 'moment/moment';

const cx = classNames.bind(styles)

function ListCandidate() {

	const {
		authState: { user: { _id, role } },
	} = useContext(AuthContext)

	const {
		recruitmentState: { recruitments },
		getRecruitment
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	let recruitmentTitleList = []

	const [filterCandidate, setFilterCandidate] = useState('latest')

	const FilterLatestCandidate = () => {
		setFilterCandidate('latest')
	}

	const FilterOldestCandidate = () => {
		setFilterCandidate('oldest')
	}

	recruitments.map(recruitment => {
		if (recruitment.user === _id) {
			recruitmentTitleList.push(recruitment)
		}
	})

	const {
		applicationState: { application, applications },
		getApplication
	} = useContext(ApplicationContext)

	useEffect(() => {
		getApplication()
	}, [])

	const [deadlineState, setDeadlineState] = useState('')
	const [filterInput, setFilterInput] = useState(false)

	//Handle Filter by date Input 
	const HandleShowFilterInput = () => {
		setFilterInput(true)
	}

	const HandleCloseFilterInput = () => {
		setFilterInput(false)
		setDeadlineState('')
	}

	const changeDeadlineState = (e) => {
		setDeadlineState(e.target.value)
	}

	// const onSubmit = async event => {
	// 	event.preventDefault()
	// 	await setDeadlineState(deadlineState)
	// }

	console.log(deadlineState);

	let body = null

	if(role === 'student'){
		body = (
			<h1>Access denied</h1>
		)
	}else{
		if (applications.length === 0) {
			body = (
				<Fragment>
					<p className={cx('header_applications')}>List Candidates</p>
					<h1>No candidate yet.</h1>
				</Fragment>
			)
		} else {
			body = (
				<Fragment>

					<p className={cx('header_applications')}>List Candidates</p>

					<div className={cx('option')}>

						{filterCandidate === 'latest' ? 
							<Fragment>
								<Button variant="success" className={cx('button_learn')} disabled>
									Latest
								</Button>
	
								<Button variant="info" className={cx('button_learn')} onClick={FilterOldestCandidate}>
									Oldest
								</Button>
							</Fragment>
							: 
							<Fragment>
								<Button variant="success" className={cx('button_learn')} onClick={FilterLatestCandidate}>
									Latest
								</Button>
	
								<Button variant="info" className={cx('button_learn')} disabled>
									Oldest
								</Button>
							</Fragment>
						}

						{filterInput === false ?
							<Button variant="warning" className={cx('button_learn')} onClick={HandleShowFilterInput}>
								Filter by Date
							</Button>
							: 
							<Button variant="warning" className={cx('button_learn')} onClick={HandleCloseFilterInput}>
								Close Input
							</Button>
						}

					</div>

					{filterInput === true && 
						<Form style={{marginBottom: '20px'}}>
							<Form.Group>

								<Form.Control
									type='date'
									name='deadlineState'
									value={deadlineState}
									onChange={changeDeadlineState}
								/>

							</Form.Group>

							{/* <Button variant='primary' type='submit'>
								Submit
							</Button> */}
						</Form>
					}

					{filterInput === false ?
						<Fragment>
							{recruitmentTitleList.map(recruitment => {
								let candidatesList = []
								let revListCandidate = []
		
								applications.map(application => {
									if (application.recruitment === recruitment._id) {
										candidatesList.push(application)
									}
								})
		
								if (filterCandidate === 'latest') {
									revListCandidate = candidatesList.reduceRight((acc, value) => {
										return [...acc, value];
									}, []);
								} else {
									revListCandidate = candidatesList
								}
		
								return (
									<div className={cx('recruitment-item')}>
		
										<h3>{recruitment.title}</h3>
										<div className={cx('list_applications')}>
											{revListCandidate.map(application => {
												return (
													<ManageCandidate key={application._id} data={application} />
												)
											})}
										</div>
		
									</div>
								)
							})}
						</Fragment>
						: 
							<Fragment>
								{deadlineState !== '' ?
									<Fragment>
										{recruitmentTitleList.map(recruitment => {
											let candidatesList = []
											// let revListCandidate = []
		
											applications.map(application => {

												const createdDay = new Date(application.createdAt)
												const dayCreate = moment(createdDay).format('YYYY-MM-DD')
												const filterDate = moment(deadlineState).format('YYYY-MM-DD')

												if (dayCreate === filterDate) {
													candidatesList.push(application)
												}
											})
		
											return (
												<div className={cx('recruitment-item')}>
		
													<h3>{recruitment.title}</h3>
													<div className={cx('list_applications')}>
														{candidatesList.map(application => {
															if (application.recruitment === recruitment._id) {
																return (
																	<ManageCandidate key={application._id} data={application} />
																)
															}
														})}
													</div>
		
												</div>
											)
										})}
									</Fragment>
									:  null
								}
							</Fragment>
					}


				</Fragment>
			)
		}
	}

	return ( 
		<div className={cx('List-candidate')}>

			{body}

			{application !== null && <DeleteApplicationModal /> }

		</div>
	);
}

export default ListCandidate;