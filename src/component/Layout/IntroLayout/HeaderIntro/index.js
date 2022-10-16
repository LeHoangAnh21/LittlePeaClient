import { CardMedia } from '@material-ui/core';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import styles from './HeaderIntro.module.scss'
import images from '~/assets/images'
import Image from '~/component/Image/Image';
import { AuthContext } from '~/actions/context/AuthContext'

const cx = classNames.bind(styles)

function HeaderIntro() {

	const {
		setShowRegisterModal,
		setShowLoginModal,
	} = useContext(AuthContext)

	return ( 
		<div className={cx('header')}>
			<img src={images.logo} alt="LittlePea" className={cx('logo')} />

			<div className={cx('slogan')}>
				<span>LittlePea - Technology is key of life</span>
			</div>

			<div className={cx('button')}>
				<Button className={cx('button-login')} onClick={setShowLoginModal.bind(this, true)}>
					Login
				</Button>
				<Button className={cx('button-register')} color="warning" onClick={setShowRegisterModal.bind(this, true)}>
					Register
				</Button>
			</div>
		</div>
	);
}

export default HeaderIntro;
