import { useEffect, useContext } from 'react';
import { CourseContext } from '~/actions/context/CourseContext';
import { AuthContext } from '~/actions/context/AuthContext';
import ManageCourse from '~/component/ManageCourse';
import UpdateCourse from './UpdateCourse';
import classNames from 'classnames/bind';
import styles from './Manage.module.scss'
import { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from 'react-bootstrap/Button';
import DeleteCourseModal from './DeleteCourse';
import AddCourseModal from '../Courses/AddCourse';
import { Toast } from 'react-bootstrap';

const cx = classNames.bind(styles)

function Manage() {

	const {
		authState: { user: { _id, role } },
	} = useContext(AuthContext)

	const {
		courseState: { course, courses },
		setShowAddCourseModal,
		getCourses,
		showToast: { show, message, type },
		setShowToast	
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	let body = null

	const YourCourse = []

	courses.map(course => {
		if (course.user === _id){
			YourCourse.push(course)
		}
	})

	if(role !== 'creator') {
		body = (
			<h1>Access denied</h1>
		)
	}else{
		if (YourCourse.length === 0) {
			body = (
				<Fragment>
					<p className={cx('header_courses')}>LIST YOUR COURSES</p>
					<h1>No courses posted.</h1>
				</Fragment>
			)
		} else {
			body = (
				<Fragment>
					<p className={cx('header_courses')}>LIST YOUR COURSES</p>

					<div className={cx('list_courses')}>
						{YourCourse.map((course) => {
							return <ManageCourse key={course._id} data={course} />
						})}
					</div>
				</Fragment>
			)
		}
	}


	return (
		<Fragment>
				<div className={cx('course_body')}>
	
					{body}

					{role === 'creator' &&
						<Fragment>
							<Fragment>
								<Button
									className={cx('btn-floating')}
									onClick={setShowAddCourseModal.bind(this, true)}
								>
									<AddIcon />
								</Button>
							</Fragment>

							<AddCourseModal />
						</Fragment>
					}

					{role === 'creator' && 
						<Fragment>
							{course !== null && <UpdateCourse />}
			
							{course !== null && <DeleteCourseModal />}
						</Fragment>
					}

					<Toast
						show={show}
						style={{ position: 'fixed', top: '20%', right: '10px' }}
						className={`bg-${type} text-white`}
						onClose={setShowToast.bind(this, {
							show: false,
							message: '',
							type: null
						})}
						delay={3000}
						autohide
					>
						<Toast.Body>
							<strong>{message}</strong>
						</Toast.Body>
					</Toast>

				</div>
		</Fragment>
	);
}

export default Manage;