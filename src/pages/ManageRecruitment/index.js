/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import ManageRecruitmentItem from '~/component/ManageRecruitmentItem';
import UpdateRecruitmentModal from './UpdatePost';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import styles from './ManageRecruitment.module.scss'
import DeleteRecruitmentModal from './DeleteRecruitment';
import { AuthContext } from '~/actions/context/AuthContext';

const cx = classNames.bind(styles)

function ManageRecruitment() {

	const {
		authState: { user: { _id, role } },
	} = useContext(AuthContext)

	const {
		recruitmentState: { recruitment, recruitments },
		getRecruitment,
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	let body = null
	const recruitmentList = []

	// eslint-disable-next-line no-lone-blocks
	{recruitments.map(recruitment => {
		if (recruitment.user === _id){
			recruitmentList.push(recruitment)
		}
	})}

	if(role === 'student'){
		body = (
			<h1>Access denied</h1>
		)
	}else{
		if (recruitmentList.length === 0) {
			body = (
				<Fragment>
					<p className={cx('header_recruitments')}>RECRUITMENT</p>
					<h1>No recruitment posted</h1>
				</Fragment>
			)
		} else {
			body = (
				<Fragment>
					<p className={cx('header_recruitments')}>RECRUITMENT</p>
					<div className={cx('list_recruitments')}>
						{recruitmentList.map((recruitment) => {
							if(recruitment.user === _id){
								return <ManageRecruitmentItem key={recruitment._id} data={recruitment} />
							}
						})}
					</div>
				</Fragment>
			)
		}
	}


	return (
		<div className={cx('recruitment_body')}>

			{body}

			{role !== 'student' && 
				<Fragment>
					{recruitment !== null && <UpdateRecruitmentModal />}
		
					{recruitment !== null && <DeleteRecruitmentModal />}
				</Fragment>
			}

		</div>
	);
}

export default ManageRecruitment;
