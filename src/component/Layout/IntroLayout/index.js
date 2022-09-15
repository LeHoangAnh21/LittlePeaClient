// import classNames from 'classnames/bind';
// import styles from './DefaultLayout.module.scss'

import HeaderIntro from "./HeaderIntro";

// const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	return (
		<div>
			<HeaderIntro />

			<div>
				{children}
			</div>

		</div>
	);
}

export default DefaultLayout;
