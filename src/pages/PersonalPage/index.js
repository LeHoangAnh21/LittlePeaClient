import classNames from 'classnames/bind';
import styles from './PersonalPage.module.scss'
import { useContext } from 'react';
import { AuthContext } from '~/actions/context/AuthContext';
import images from '~/assets/images';
import { CardMedia } from '@material-ui/core';

const cx = classNames.bind(styles)

function PersonalPage() {

	const {
		authState: { user: { username, role, fullname, avatar, createdAt } },
	} = useContext(AuthContext)

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
					<h1>ahihi do cho</h1>
				</div>
			</div>
		</div>
	);
}

export default PersonalPage;
