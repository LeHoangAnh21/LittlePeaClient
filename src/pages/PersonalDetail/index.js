import classNames from 'classnames/bind';
import styles from './PersonalDetail.module.scss'
import { useContext, useEffect } from 'react';
import { UserContext } from '~/actions/context/UserContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { PointContext } from '~/actions/context/PointContext';
import images from '~/assets/images';
import { CardMedia } from '@material-ui/core';
import { Link, useParams } from "react-router-dom";
import { Fragment } from 'react';

const cx = classNames.bind(styles)

function PersonalDetail() {

	const {id} = useParams();

	const {
		userState: { users },
		getUser,
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

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

	let date

	users.map((user) => {
		if(user._id === id){
			date = user.createdAt
		}
	})

	console.log(date);

	const dateSince = new Date(date)
	let day = dateSince.getDate()
	let month = dateSince.getMonth() + 1
	let year = dateSince.getFullYear()

	console.log(day, month, year);

	return (
		<div>
			{users.map((user) => {
				if (user._id === id) {
					return (
						<div className={cx('personal-page')}>
							<div className={cx('page-header')}>
								{!user.avatar ?
									<div className={cx('avatar')}>
										<img src={images.avatarDefault} alt="" className={cx('avatar-personal')} />
									</div>
									: <CardMedia image={user.avatar} title='avatar' className={cx('avatar-personal')} />
								}
								<h2 className={cx('fullname')}>{user.fullname ? user.fullname : user.username}</h2>
							</div>

							<div className={cx('personal-page-body')}>

								<div className={cx('personal-info')}>
									<h2 className={cx('personal-title')}>Fullname:</h2>
									<span className={cx('personal-title-info')}>{user.fullname ? user.fullname : user.username}</span>
									<h2 className={cx('personal-title')}>Username:</h2>
									<span className={cx('personal-title-info')}>{user.username}</span>
									<h2 className={cx('personal-title')}>Role:</h2>
									<span className={cx('personal-title-info')} style={{ textTransform: "capitalize" }}>{user.role}</span>
									<h2 className={cx('personal-title')}>Date since:</h2>
									<span className={cx('personal-title-info')}> {day} / {month} / {year} </span>
								</div>

								<div className={cx('score')}>
									{points.map(point => {
										if(point.user === id) {
											return (
												<Fragment>
													<Fragment>
														{courses.map(course => {
															if (course._id === point.course){
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
					)
				}
			})}
		</div>
	)
}

export default PersonalDetail;
