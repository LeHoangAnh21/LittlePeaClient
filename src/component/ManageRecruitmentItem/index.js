
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { UserContext } from '~/actions/context/UserContext';
import { useContext, useEffect } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./ManageRecruitmentItem.module.scss"
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function ManageRecruitmentItem({ data }) {

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

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
				</div>

				<div className={cx('employer')}>
					{users.map((user) => {
						if (user._id === data.user) {
							return (
								<Fragment>
									{!user.avatar ?
										<img src={images.avatarDefault} alt="" className={cx('employer-avatar')} />
										: <CardMedia image={user.avatar} title='avatar' className={cx('employer-avatar')} />
									}
									{!user.fullname ?
										<span className={cx('employer-fullname')}>{user.role}</span>
										: <span className={cx('employer-fullname')}>{user.fullname}</span>
									}
								</Fragment>
							)
						}
					})}
					{/* <img src={images.founder} alt="" />
					<span>Le Hoang Anh</span> */}
				</div>
			</div>

		</Fragment>
	);
}

export default ManageRecruitmentItem;