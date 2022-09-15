import { UserContext } from '~/actions/context/UserContext';
import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import Search from '../Search';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function Header() {

	// const {
	// 	setShowAddUserModal,
	// } = useContext(UserContext)

	return (
		<div className={cx('header')}>
			
			<img src={images.logo} alt="" className={cx('logo')} />

			<Search />
		
			<div className={cx('option')}>

				<Dropdown>
					<Dropdown.Toggle variant="light" id="dropdown-basic">
						<img alt="" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B" className={cx('avatar')} />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item className={cx('option-item')} href="#/action-1">Personal page</Dropdown.Item>
						<Dropdown.Item className={cx('option-item')} href="#/action-2">Log-out</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

			</div>
		
		</div>


	)
}

export default Header;