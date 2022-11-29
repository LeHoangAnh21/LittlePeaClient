import classNames from 'classnames/bind';
import styles from './PersonalPage.module.scss'
import { useContext, Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '~/actions/context/AuthContext';
import { PointContext } from '~/actions/context/PointContext';
import { CourseContext } from '~/actions/context/CourseContext';
import images from '~/assets/images';
import { CardMedia } from '@material-ui/core';

const cx = classNames.bind(styles)

function PersonalPage() {

	const {
		authState: { user: { _id, username, role, fullname, avatar, createdAt } },
	} = useContext(AuthContext)

	const {
		courseState: { courses },
		getCourses,
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	const {
		pointState: { points },
		getPoints,
	} = useContext(PointContext)

	useEffect(() => {
		getPoints()
	}, [])

	const dateSince = new Date(createdAt)
	let day = dateSince.getDate()
	let month = dateSince.getMonth()
	let year = dateSince.getFullYear()

	return (
		<div className={cx('personal-page')}>
			<div className={cx('page-header')}>
				{!avatar ?
					<div className={cx('avatar')}>
						<img src={images.avatarDefault} alt="" className={cx('avatar-personal')} />
					</div>
					: <CardMedia image={avatar} title='avatar' className={cx('avatar-personal')} />
				}
				<h2 className={cx('fullname')}>{fullname ? fullname : username}</h2>
			</div>

			<div className={cx('personal-page-body')}>

				<div className={cx('personal-info')}>
					<h2 className={cx('personal-title')}>Fullname:</h2>
					<span className={cx('personal-title-info')}>{fullname ? fullname : username}</span>
					<h2 className={cx('personal-title')}>Username:</h2>
					<span className={cx('personal-title-info')}>{username}</span>
					<h2 className={cx('personal-title')}>Role:</h2>
					<span className={cx('personal-title-info')} style={{ textTransform: "capitalize" }}>{role}</span>
					<h2 className={cx('personal-title')}>Date since:</h2>
					<span className={cx('personal-title-info')}> {day} / {month} / {year} </span>
				</div>

				<div className={cx('score')}>
					{points.map(point => {
						if (point.user === _id) {
							return (
								<Fragment>
									<Fragment>
										{courses.map(course => {
											if (course._id === point.course) {
												return (
													<div>
														<Link to={`/courses/${course._id}`} className={cx('personal-title')} style={{ cursor: 'pointer' }}>
															<h4>{course.name}</h4>
														</Link>
													</div>
												)
											}
										})}
									</Fragment>
									<h3 style={{ marginLeft: '30px' }}>{point.point} points</h3>
								</Fragment>
							)
						}
					})}
				</div>
			</div>
		</div>
	);
}

export default PersonalPage;
