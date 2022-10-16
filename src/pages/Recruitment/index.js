/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import RecruitmentItem from '~/component/RecruitmentItem';
import AddRecruitmentModal from './AddPost';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames/bind';
import styles from './Recruitment.module.scss'
import { AuthContext } from '~/actions/context/AuthContext';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Recruitment() {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

	const {
		recruitmentState: { recruitment, recruitments, recruitmentsLoading },
		setShowAddRecruitmentModal,
		getRecruitment,
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	let body = null

	if (recruitments.length === 0) {
		body = (
			<h1>No recruitment posted.</h1>
		)
	} else {
		body = (
			<div className={cx('list_recruitments')}>
				{recruitments.map((recruitment) => {
					return <RecruitmentItem key={recruitment._id} data={recruitment} />
				})}
			</div>
		)
	}

	return (
		<div className={cx('recruitment_body')}>

			<p className={cx('header_recruitments')}>RECRUITMENT</p>

			{role !== 'student' &&
				<div className={cx('option')}>

					<Link to={`/manage-recruitment`} className={cx('button_learn')}>
						<Button variant="success">
							Manage Post
						</Button>
					</Link>

					<Link to={`/list-candidate`} className={cx('button_learn')}>
						<Button variant="info">
							List Candidate
						</Button>
					</Link>

				</div>
			}

			{body}

			{role !== 'student' && 
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

export default Recruitment;
