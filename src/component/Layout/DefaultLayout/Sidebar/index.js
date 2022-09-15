import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import WorkIcon from '@material-ui/icons/Work';


const cx = classNames.bind(styles);

const sidebarItem = document.querySelectorAll('.button')

console.log(sidebarItem);

// sidebarItem.forEach((btn) => {
// 	btn.addEventListener('click', (e) => {
// 		btn.classList.add('active')
// 	})
// })

const handleActive = (e) => {
	sidebarItem.forEach((btn) => {
		console.log(btn.target);
		btn.classList.remove(cx('active'));
	})
	e.target.classList.add(cx('active'));
}

function Sidebar() {
	return (
		<div className={cx('sidebar')}>
			<ul className={cx('list')}>
				<li>
					<Link to={`/home`} className={cx('sidebar-item', 'button', 'active')} onClick={handleActive}>
						<HomeIcon />
						<span>Home</span>
					</Link>
				</li>

				<li>
					<Link to={`/courses`} className={cx('sidebar-item', 'button')} onClick={handleActive}>
						<MenuBookIcon />
						<span>Courses</span>
					</Link>
				</li>

				<li>
					<Link to={`/blog`} className={cx('sidebar-item', 'button')} onClick={handleActive}>
						<QuestionAnswerIcon />
						<span>Blog</span>
					</Link>
				</li>

				<li>
					<Link to={`/recruitment`} className={cx('sidebar-item', 'button')} onClick={handleActive}>
						<WorkIcon />
						<span>Recruitment</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;