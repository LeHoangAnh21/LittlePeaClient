import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { ApplicationContext } from '~/actions/context/ApplicationContext'
import { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RecruitmentDetail.module.scss'
import { useParams } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import AlbumIcon from '@material-ui/icons/Album';
import { Button } from 'react-bootstrap';
import ApplyModal from '../Application/ApplyModal';

const cx = classNames.bind(styles)

function RecruitmentDetail() {

	const {
		setShowAddApplicationModal,
	} = useContext(ApplicationContext)

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
						return (
							<div>
								<div className={cx('company_info')}>
									<div className={cx('company_avatar')}>
										{recruitment.image !== '' && <CardMedia image={recruitment.image || ''} title='Title' className={cx('avatar')} />}
									</div>
									<div className={cx('company_title')}>
										<h3>{recruitment.title}</h3>
										<h4>Công ty TNHH Giải pháp Phần Mềm Ánh Sáng</h4>
										<span>
											<AccessAlarmsIcon />
											&nbsp;
											Hạn nộp hồ sơ: 02/09/2022
										</span>
									</div>
									<div className={cx('button')}>
										<div className={cx('button_apply')}>
											<Button onClick={setShowAddApplicationModal.bind(this, true)}>
												<span>Apply Now</span>
											</Button>
										</div>
										<div className={cx('button_save')}>
											<Button variant="outline-primary">
												<span>Save</span>
											</Button>
										</div>
									</div>
								</div>

								<div className={cx('content')}>
									<div key={recruitment._id} className={cx('recruitment_content')}>

										<div className={cx('content_recruitment')}>
											<h2>Job Description</h2>
											<span>{recruitment.content || 'None'}</span>
										</div>
										<br /> <br />

										<div className={cx('content_recruitment')}>
											<h2>Requirements for Applicants</h2>
											<span>{recruitment.content || 'None'}</span>
										</div>
										<br /> <br />

										<div className={cx('content_recruitment')}>
											<h2>Benefits for Candidates</h2>
											<span>{recruitment.content || 'None'}</span>
										</div>
										<br /> <br />

										{recruitment.image !== '' && <CardMedia image={recruitment.image || ''} title='Title' className={cx('media')} />}
	
									</div>
	
									<div className={cx('category')}>
										hello
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

		</div>
	);
}

export default RecruitmentDetail;
