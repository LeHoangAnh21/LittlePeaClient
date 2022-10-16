import { CategoryContext } from '~/actions/context/CategoryContext';
import { UserContext } from '~/actions/context/UserContext';
import { useContext, useEffect } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./CourseItem.module.scss"
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function CourseItem({ data }) {

	const {
		categoryState: { categories },
	} = useContext(CategoryContext)

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

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