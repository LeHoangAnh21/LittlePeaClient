import { useEffect, useContext } from 'react';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import ManageRecruitmentItem from '~/component/ManageRecruitmentItem';
import UpdateRecruitmentModal from './UpdatePost';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames/bind';
import styles from './ManageRecruitment.module.scss'
import DeleteRecruitmentModal from './DeleteRecruitment';
import { AuthContext } from '~/actions/context/AuthContext';
import AddRecruitmentModal from '../Recruitment/AddPost';
import moment from 'moment/moment';

const cx = classNames.bind(styles)

function ManageRecruitment() {

	const {
		authState: { user: { _id, role, activation, time } },
	} = useContext(AuthContext)

	const {
		recruitmentState: { recruitment, recruitments },
		getRecruitment,
		setShowAddRecruitmentModal
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	let activateStatus = null
	const activateTime = moment(time).format('YYYY-MM-DD');
	const timeNow = moment(new Date()).format('YYYY-MM-DD')

	if (activation === 'activated') {
		if (activateTime >= timeNow) {
			activateStatus = 'approved'
		} else {
			activateStatus = 'expired'
		}
	} else if (activation === 'blocked') {
		activateStatus = 'blocked'
	} else {
		activateStatus = 'waiting'
	}

	let body = null
	const recruitmentList = []

	recruitments.map(recruitment => {
		if (recruitment.user === _id){
			recruitmentList.push(recruitment)
		}
	})

	if(role !== 'recruitment'){
		body = (
			<h1>Access denied</h1>
		)
	}else{
		if (recruitmentList.length === 0) {
			body = (
				<Fragment>
					<h1>No recruitment posted</h1>
				</Fragment>
			)
		} else {
			body = (
				<Fragment>
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

			{activateStatus === 'approved' && 
				<div className={cx('status-approved')}>
					<span className={cx('status-title')}>Your account has been activated. The deadline is {activateTime}.</span>
				</div>
			}

			{activateStatus === 'expired' &&
				<div className={cx('status-expired')}>
					<span className={cx('status-title')}>Your account expired {activateTime}. Please email to 'anhlhgch190172@fpt.edu.vn' to renew.</span>
				</div>
			}

			{activateStatus === 'blocked' &&
				<div className={cx('status-blocked')}>
					<span className={cx('status-title')}>Your account has been locked. Please send an email to 'anhlhgch190172@fpt.edu.vn' to receive feedback.</span>
				</div>
			}

			{activateStatus === 'waiting' &&
				<div className={cx('status-waiting')}>
					<span className={cx('status-title')}>Your account has not been activated. Please send an email to 'anhlhgch190172@fpt.edu.vn' for account activation.</span>
				</div>
			}

			<p className={cx('header_recruitments')}>RECRUITMENT</p>

			{body}

			{role !== 'student' && 
				<Fragment>
					{recruitment !== null && <UpdateRecruitmentModal />}
		
					{recruitment !== null && <DeleteRecruitmentModal />}
				</Fragment>
			}

			{role === 'recruitment' && activateStatus === 'approved' && 
				<Fragment>
					<Fragment>
						<Button
							className={cx('btn-floating')}
							onClick={setShowAddRecruitmentModal.bind(this, true)}
						>
							<AddIcon />
						</Button>
					</Fragment>
					<AddRecruitmentModal />
				</Fragment>
			}


		</div>
	);
}

export default ManageRecruitment;
