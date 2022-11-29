
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { useContext, useEffect } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./ManageRecruitmentItem.module.scss"
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

const cx = classNames.bind(styles)

function ManageRecruitmentItem({ data }) {

	const {
		categoryState: { categories },
		getCategories
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const {
		findRecruitmentId,
		setShowUpdateRecruitmentModal,
		setShowDeleteRecruitmentModal,
	} = useContext(RecruitmentContext)

	const chooseRecruitment = recruitmentId => {
		findRecruitmentId(recruitmentId)
		setShowUpdateRecruitmentModal(true)
	}

	const deleteRecruitment = recruitmentId => {
		findRecruitmentId(recruitmentId)
		setShowDeleteRecruitmentModal(true)
	}

	let statusRecruitments = null

	const deadlineDay = new Date(data.deadline)
	const current = new Date()

	const deadlineDate = moment(deadlineDay).format('YYYY-MM-DD')
	const currentDay = moment(current).format('YYYY-MM-DD')

	if (deadlineDate < currentDay) {
		statusRecruitments = 'Hide'
	} else {
		statusRecruitments = 'Public'
	}

	return (

		<Fragment>
			<div className={cx('recruit_item')} >
				<div className={cx('recruit_avatar')}>
					<CardMedia image={data.image || ''} title='Title' className={cx('media')} />
					
					<Link to={`/recruitment/${data._id}`} className={cx('button_learn')}>
						<Button>
							View now
						</Button>
					</Link>
					<Button className={cx('button_edit')} onClick={chooseRecruitment.bind(this, data._id)}>
						<EditIcon />
					</Button>

					<Button className={cx('button_delete')} onClick={deleteRecruitment.bind(this, data._id)}>
						<DeleteIcon />
					</Button>

				</div>

				<div className={cx('body-recruitItem')}>
					<Link to={`/recruitment/${data._id}`} className={cx('link')}>
						<h5 className={cx('title')}>{data.title}</h5>
					</Link>
					<span className={cx('category')}>
						{categories.map((category) => {
							let categoryTitle = null
							if (category._id === data.category) {
								categoryTitle = category.title
							}
							return categoryTitle
						})}
					</span>

					<span className={cx('salary')}>{data.salary}</span>

					<span className={cx('location')}>{data.location}</span>

					<div className={cx('status')}>
						<span className={cx('status-title')}>Status:</span>
						{data.status === 'Hide' ?
							<span className={cx('status-color-hide')}>{data.status}</span>
							: <span className={cx('status-color-public')}>{data.status}</span>
						}
					</div>
					<div className={cx('status')}>
						{statusRecruitments === 'Hide' && data.status === 'Public' ?
							<span className={cx('status-color-hide')}>
								The system has automatically hidden this job posting because it has expired.
							</span>
							: null
						}

						{statusRecruitments === 'Hide' && data.status === 'Hide' ?
							<span className={cx('status-color-hide')}>
								This job posting has expired.
							</span>
							: null
						}
					</div>
				</div>

			</div>

		</Fragment>
	);
}

export default ManageRecruitmentItem;