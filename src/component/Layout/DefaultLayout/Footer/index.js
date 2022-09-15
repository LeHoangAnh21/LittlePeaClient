import classNames from 'classnames/bind';
import { Fragment } from 'react';
import FooterComponent from '../../FooterComponent';
import styles from './Footer.module.scss'

const cx = classNames.bind(styles);

function Footer() {
	return (
		<Fragment>
			<FooterComponent />
		</Fragment>
	);
}

export default Footer;