
import { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import classNames from 'classnames/bind';
import styles from "./ManageLessonItem.module.scss";
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { LessonContext } from '~/actions/context/LessonContext';

const cx = classNames.bind(styles)

function ManageLessonItem({ data }) {

	const opts = {
		height: '500',
		width: '850',
	}

	const [hidden, setHidden] = useState(true);
	const [show, setShow] = useState(false);
	const handleClick = () => {
		setHidden(!hidden);
		setShow(!show);
	};

	const {
		findLessonId,
		setShowUpdateLessonModal,
		setShowDeleteLessonModal,
	} = useContext(LessonContext)

	const chooseLesson = lessonId => {
		findLessonId(lessonId)
		setShowUpdateLessonModal(true)
	}

	const deleteLesson = lessonId => {
		findLessonId(lessonId)
		setShowDeleteLessonModal(true)
	}

	return ( 
		<div className={cx('lesson-item')}>
			<div className={cx('title')}>
				<div className={cx('title-header')} onClick={handleClick}>
					<div className={cx({ show: show })} >
						<AddIcon className={cx('icon')} />
					</div>
					<div className={cx({ hidden: hidden })} >
						<FilterListIcon className={cx('icon')} />
					</div>
					<span>{data.title}</span>
				</div>
				<div className={cx('title-footer')}>
					<Button className={cx('button_edit')} onClick={chooseLesson.bind(this, data._id)}>
						<EditIcon />
					</Button>

					<Button className={cx('button_delete')} onClick={deleteLesson.bind(this, data._id)}>
						<DeleteIcon />
					</Button>
				</div>
			</div>
			<div className={cx({hidden: hidden})}>
				<div className={cx('description')}>
					<span>{data.description || 'None'}</span>
				</div>
				<div className={cx('video')}>
					<YouTube videoId={data.videoId} opts={opts} />
				</div>
			</div>
		</div>
	);
}

export default ManageLessonItem;
