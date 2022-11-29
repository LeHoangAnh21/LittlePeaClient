import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { ApplicationContext } from '~/actions/context/ApplicationContext'
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RecruitmentDetail.module.scss'
import { useParams } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import { Button, Toast } from 'react-bootstrap';
import ApplyModal from '../ListCandidate/ApplyModal';
import images from '~/assets/images';
import moment from 'moment/moment';

const cx = classNames.bind(styles)

function RecruitmentDetail() {

	const {
		authState: { user: { _id } },
	} = useContext(AuthContext)

	const {
		setShowAddApplicationModal,
		showToast: { show, message, type },
		setShowToast	
	} = useContext(ApplicationContext)

	const {
		categoryState: { categories },
		getCategories
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const { id } = useParams();

	const recruitmentId = id;

	const {
		recruitmentState: { recruitments, },
		getRecruitment,
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])


	let body = null

	if (recruitments !== null) {
		body = (
			<Fragment>
				{recruitments.map((recruitment) => {
					if (recruitmentId === recruitment._id) {
						const deadlineDay = new Date(recruitment.deadline)
						const current = new Date()

						// const deadlineDate = moment(deadlineDay).format('YYYY-MM-DD')
						// const currentDay = moment(current).format('YYYY-MM-DD')
						// console.log(deadlineDate)
						// console.log(currentDay)
						// console.log(deadlineDate === currentDay)

						let day = deadlineDay.getDate()
						let month = deadlineDay.getMonth() + 1
						let year = deadlineDay.getFullYear()
						return (
							<div>
								<div className={cx('company_info')}>
									<div className={cx('company_avatar')}>
										{!recruitment.avatarCompany ?
											<img src={images.defaultCompanyImage} alt="" title='Company Image' className={cx('avatar')} />
											: <CardMedia image={recruitment.avatarCompany} title='avatar' className={cx('avatar')} />
										}
									</div>
									<div className={cx('company_title')}>
										<h3>{recruitment.title}</h3>
										<h4>{recruitment.company}</h4>
										<span>
											<AccessAlarmsIcon />
											&nbsp;
											Application deadline: {day} / {month} / {year}
										</span>
									</div>
									{recruitment.user !== _id &&
										<div className={cx('button')}>
											<div className={cx('button_apply')}>
												<Button onClick={setShowAddApplicationModal.bind(this, true)}>
													<span>Apply Now</span>
												</Button>
											</div>
										</div>
									}
								</div>

								<div className={cx('content')}>
									<div key={recruitment._id} className={cx('recruitment_content')}>

										<div className={cx('content_recruitment')}>
											<h2>Job Description</h2>
											<span>{recruitment.jobDescription || 'None'}</span>
										</div>
										<br /> <br />

										<div className={cx('content_recruitment')}>
											<h2>Requirements for Applicants</h2>
											<span>{recruitment.requirementsCandidates || 'None'}</span>
										</div>
										<br /> <br />

										<div className={cx('content_recruitment')}>
											<h2>Benefits for Candidates</h2>
											<span>{recruitment.benefitsCandidates || 'None'}</span>
										</div>
										<br /> <br />

										{recruitment.image !== '' && <CardMedia image={recruitment.image || ''} title='Title' className={cx('media')} />}

									</div>

									<div className={cx('recruitment-another')}>
										<div className={cx('salary')}>
											<MonetizationOnIcon fontSize="large" className={cx('salary-icon')} />
											<div className={cx('salary-item')}>
												<span>Salary</span>
												<span>{recruitment.salary}</span>
											</div>
										</div>

										<div className={cx('salary')}>
											<GroupIcon fontSize="large" className={cx('salary-icon')} />
											<div className={cx('salary-item')}>
												<span>Number of recruiting</span>
												<span>{recruitment.numberRecruiting}</span>
											</div>
										</div>

										<div className={cx('salary')}>
											<WorkIcon fontSize="large" className={cx('salary-icon')} />
											<div className={cx('salary-item')}>
												<span>Experience</span>
												<span>{recruitment.experience}</span>
											</div>
										</div>

										<div className={cx('salary')}>
											<CategoryIcon fontSize="large" className={cx('salary-icon')} />
											<div className={cx('salary-item')}>
												<span>Category</span>
												<span>
													{categories.map((category) => {
														let categoryTitle = null
														if (category._id === recruitment.category) {
															categoryTitle = category.title
														}
														return categoryTitle
													})}
												</span>
											</div>
										</div>

										<div className={cx('salary')}>
											<LocationOnIcon fontSize="large" className={cx('salary-icon')} />
											<div className={cx('salary-item')}>
												<span>Location</span>
												<span>{recruitment.location}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
				})}
			</Fragment>
		)
	}

	return (
		<div className={cx('blog_detail')}>

			{body}

			<ApplyModal data={recruitmentId} />

			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>

		</div>
	);
}

export default RecruitmentDetail;
