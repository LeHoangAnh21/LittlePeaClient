import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss'
import AddLesson from "~/pages/Lesson/AddLesson";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	return (
		<div className={cx('wrapper')}>
			<Header />

			<div className={cx('container')}>
				<Sidebar />
				<div className={cx('content')}>
					<div>
						{children}
						<AddLesson />
					</div>

				</div>
			</div>

			<Footer />
		</div>
	);
}

export default DefaultLayout;