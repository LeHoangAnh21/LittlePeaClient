import { CardMedia } from '@material-ui/core';
import { UserContext } from '~/actions/context/UserContext';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import styles from './HeaderIntro.module.scss'
import images from '~/assets/images'
import AddUserModal from '~/pages/ManageUser/AddUser';
import Image from '~/component/Image/Image';

const cx = classNames.bind(styles)

function HeaderIntro() {

	const {
		setShowAddUserModal,
	} = useContext(UserContext)

	return ( 
		<div className={cx('header')}>
			<img src={images.logo} alt="LittlePea" className={cx('logo')} />

			<div className={cx('slogan')}>
				<span>LittlePea - Technology is key of life</span>
			</div>

			<div className={cx('button')}>
				<Button className={cx('button-login')}>
					Login
				</Button>
				<Button className={cx('button-register')} color="warning" onClick={setShowAddUserModal.bind(this, true)}>
					Register
				</Button>
			</div>

			<AddUserModal />
		</div>
	);
}

export default HeaderIntro;
