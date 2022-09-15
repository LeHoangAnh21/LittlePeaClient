import classNames from 'classnames/bind';
import styles from './FooterComponent.module.scss';
import images from '~/assets/images';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

const cx = classNames.bind(styles)

function FooterComponent() {
	return ( 
		<div className={cx('footer')}>
			<img src={images.logo} alt="logo" className={cx('footer-logo')} />

			<div className={cx('info')}>
				<h3>Information:</h3>
				<span className={cx('location')}>
					<LocationOnIcon className={cx('location-icon')} />
					University of Greenwich, 2 Pham Van Bach, Cau Giay, Ha Noi
				</span>
				<span className={cx('email')}>
					<EmailIcon className={cx('location-icon')} />
					anhlhgch190172@fpt.edu.vn
				</span>
				<span className={cx('email')}>
					<PhoneAndroidIcon className={cx('location-icon')} />
					0829.004.889
				</span>
			</div>
		</div>
	);
}

export default FooterComponent;