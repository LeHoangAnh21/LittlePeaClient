import classNames from 'classnames/bind'
import styles from './ListCandidate.module.scss'
import { useEffect, useContext } from 'react';
import { ApplicationContext } from '~/actions/context/ApplicationContext';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { Fragment } from 'react';
import ManageCandidate from '~/component/ManageCandidate';

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

	recruitments.map(recruitment => {
		if (recruitment.user === _id) {
			recruitmentTitleList.push(recruitment)
		}
	})

	console.log(recruitmentTitleList);

	const {
		applicationState: { applications },
		getApplication
	} = useContext(ApplicationContext)

	useEffect(() => {
		getApplication()
	}, [])

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

					{recruitmentTitleList.map(recruitment => {
						return (
							<div className={cx('recruitment-item')}>

								<h3>{recruitment.title}</h3>
								<div className={cx('list_applications')}>
									{applications.map(application => {
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
			)
		}
	}

	return ( 
		<div className={cx('List-candidate')}>

			{body}

		</div>
	);
}

export default ListCandidate;