
import YouTube from 'react-youtube';
import classNames from 'classnames/bind';
import styles from "./LessonItem.module.scss"
import { useState } from 'react';
import { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import CloseIcon from '@material-ui/icons/Close';

const cx = classNames.bind(styles)

function LessonItem({ data }) {

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

	return ( 
		<div className={cx('lesson-item')}>
			<div className={cx('title')} onClick={handleClick}>
				<div className={cx('title-header')}>
					<div className={cx({ show: show })} >
						<AddIcon className={cx('icon')} />
					</div>
					<div className={cx({ hidden: hidden })} >
						<FilterListIcon className={cx('icon')} />
					</div>
					<span>{data.title}</span>
				</div>
				<div className={cx('title-footer')}>
					<div className={cx({ show: show })} >
						<ArrowDropDownTwoToneIcon className={cx('icon')} />
					</div>
					<div className={cx({ hidden: hidden })} >
						<CloseIcon className={cx('icon')} />
					</div>
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

export default LessonItem;
