import { AuthContext } from '~/actions/context/AuthContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { UserContext } from '~/actions/context/UserContext';
import { useContext, useEffect } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./CourseItem.module.scss"
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import EditIcon from '@material-ui/icons/Edit';

const cx = classNames.bind(styles)

function CourseItem({ data }) {

	const {
		authState: { user: {role} },
	} = useContext(AuthContext)

	const {
		categoryState: { categories },
		getCategories
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		findCourseId,
		setShowUpdateCourseModal,
	} = useContext(CourseContext)

	const chooseCourse = courseId => {
		findCourseId(courseId)
		setShowUpdateCourseModal(true)
	}

	return (
		<Fragment>
			<div className={cx('course_item')} >
				<div className={cx('course_avatar')}>
					<CardMedia image={data.image || ''} title='Title' className={cx('media')} />

					<Link to={`/courses/${data._id}`} className={cx('button_learn')}>
						<Button>
							Learn now
						</Button>
					</Link>

					{role === 'admin' && 
						<Button className={cx('button_edit')} onClick={chooseCourse.bind(this, data._id)}>
							<EditIcon />
						</Button>
					}
					
				</div>

				<div className={cx('body-courseItem')}>
					<Link to={`/courses/${data._id}`} className={cx('title-link')}>
						<h3 className={cx('title')}>{data.name}</h3>
					</Link>
					
					<div className={cx('category')}>
						{categories.map((category) => {
							let categoryTitle = null
							if (category._id === data.category) {
								categoryTitle = category.title
							}
							return categoryTitle
						})}
					</div>

					<div className={cx('creator')}>
						{users.map((user) => {
							if(user._id === data.user){
								return (
									<Fragment>
										{!user.avatar ?
											<img src={images.avatarDefault} alt="" className={cx('avatar')} />
											: <CardMedia image={user.avatar} title='avatar' className={cx('avatar')} />
										}
										{!user.fullname ? 
											<span className={cx('fullname-course')}>{user.role}</span>
											: <span className={cx('fullname-course')}>{user.fullname}</span>
										}
									</Fragment>
								)
							}
						})}
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default CourseItem;