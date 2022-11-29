import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import images from '~/assets/images';
import { AuthContext } from '~/actions/context/AuthContext';
import { CardMedia } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles)

function Header() {

	const {
		authState: {user: { _id, username, avatar }},
		logoutAccount,
	} = useContext(AuthContext)

	const navigate = useNavigate();

	const logout = () => {
		logoutAccount()
		navigate("/")
	}

	return (
		<div className={cx('header')}>
			
			<img src={images.logo} alt="" className={cx('logo')} />
		
			<div className={cx('option')}>

				<Dropdown>
					<Dropdown.Toggle variant="light" id="dropdown-basic" className={cx('toggle')}>
						{!avatar ? 
							<img src={images.avatarDefault} alt="" className={cx('avatar')} />
							: <CardMedia image={avatar} title='avatar' className={cx('avatar')} />
						}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item className={cx('option-item')}>
							<NavLink to={`/personal`} className={cx('personal-page')}>
								{username} (Personal page)
							</NavLink>	
						</Dropdown.Item>
						<Dropdown.Item className={cx('option-item')} onClick={logout}>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

			</div>
		
		</div>


	)
}

export default Header;