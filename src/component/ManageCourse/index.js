// import { Fragment } from 'react'
import { CourseContext } from '~/actions/context/CourseContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { useContext } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./ManageCourse.module.scss"
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function ManageCourse({ data }) {

	const {
		categoryState: { categories },
	} = useContext(CategoryContext)

	const {
		findCourseId,
		setShowUpdateCourseModal,
		setShowDeleteCourseModal,
	} = useContext(CourseContext)

	const chooseCourse = courseId => {
		findCourseId(courseId)
		setShowUpdateCourseModal(true)
	}

	const deleteCourse = courseId => {
		findCourseId(courseId)
		setShowDeleteCourseModal(true)
	}

	return (
		<Fragment>
			<div className={cx('course_item')} >
				<div className={cx('course_avatar')}>
					<CardMedia image={data.image || ''} title='Title' className={cx('media')} />

					<Link to={`/manage/${data._id}`} className={cx('button_learn')}>
						<Button>
							Learn now
						</Button>
					</Link>

					<Button className={cx('button_edit')} onClick={chooseCourse.bind(this, data._id)}>
						<EditIcon />
					</Button>

					<Button className={cx('button_delete')} onClick={deleteCourse.bind(this, data._id)}>
						<DeleteIcon />
					</Button>
				</div>

				<p className={cx('body-courseItem')}>
					<h5 className={cx('title')}>{data.name}</h5>
					<p className={cx('category')}>
						{categories.map((category) => {
							let categoryTitle = null
							if (category._id === data.category) {
								categoryTitle = category.title
							}
							return categoryTitle
						})}
					</p>
				</p>
			</div>

		</Fragment>
	);
}

export default ManageCourse;