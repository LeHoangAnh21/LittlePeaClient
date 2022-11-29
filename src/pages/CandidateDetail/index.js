import { Link, useParams } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CandidateDetail.module.scss'
import { ApplicationContext } from '~/actions/context/ApplicationContext';
import { UserContext } from '~/actions/context/UserContext';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { CardMedia } from "@material-ui/core";
import { Modal } from "react-bootstrap";

const cx = classNames.bind(styles)

function CandidateDetail() {

	const { id } = useParams();

	const {
		userState: { users, },
		getUser,
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		recruitmentState: { recruitments },
		getRecruitment
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	const {
		applicationState: { applications },
		getApplication
	} = useContext(ApplicationContext)

	useEffect(() => {
		getApplication()
	}, [])

	const [showCV, setShowCV] = useState(false)

	const closeModal = () => {
		setShowCV(false)
	}

	return (  
		<Fragment>
			{applications.map((application) => {
				if(application._id === id){
					return (
						<Fragment>
							<div>
								{recruitments.map((recruitment) => {
									if (recruitment._id === application.recruitment){
										return (
											<div className={cx('recruitment-title')}>
												<span className={cx('title-small')}>Post:</span>
												<h2>{recruitment.title}</h2>
											</div>
										)
									}
								})}
							</div>
							<div className={cx('application-detail')}>
								<div className={cx('application-user')}>
									{users.map((user) => {
										if (user._id === application.user){
											return (
												<Fragment>
													<div className={cx('avatar-component')}>
														<CardMedia image={user.avatar} title='Avatar' className={cx('avatar')} />
													</div>
													<div className={cx('application-info')}>
														<span className={cx('title-small')}>Fullname:</span>
														<Link to={`/personal/${user._id}`} className={cx('title-big')} style={{ cursor: 'pointer' }}>
															{user.fullname}
														</Link>
													</div>
												</Fragment>
											)
										}
									})}
								</div>

								<div className={cx('application-content')}>
									<div className={cx('application-cv')}>
										<div style={{ backgroundImage: `url(${application.imageCV})` }} onClick={() => setShowCV(true)} className={cx('cv')}></div>
									</div>
									<div className={cx('application-description')}>
										<p className={cx('description')}>{application.description}</p>
									</div>
									<CardMedia file={application.fileCV} title='Avatar' />
									<Modal show={showCV} onHide={closeModal} size='lg'>
										<Modal.Header closeButton>
											<h3>CV Detail</h3>
										</Modal.Header>
										<div className={cx('application-cv-detail')}>
										<div style={{ backgroundImage: `url(${application.imageCV})` }} className={cx('cv')}></div>
										</div>
									</Modal>
								</div>
							</div>
						</Fragment>
					)
				}
			})}
		</Fragment>

	);
}

export default CandidateDetail;