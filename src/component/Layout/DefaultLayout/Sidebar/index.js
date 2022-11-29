import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import WorkIcon from '@material-ui/icons/Work';
import { Fragment, useContext } from 'react';
import { AuthContext } from '~/actions/context/AuthContext';

const cx = classNames.bind(styles);

function Sidebar() {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

	return (
		<div className={cx('sidebar')}>
			<ul className={cx('list')}>
				<li>
					<NavLink to={`/home`} className={(nav) => cx('sidebar-item', {active: nav.isActive})}>
						<HomeIcon />
						<span>Home</span>
					</NavLink>
				</li>

				<li>
					<NavLink to={`/courses`} className={(nav) => cx('sidebar-item', { active: nav.isActive })}>
						<MenuBookIcon />
						<span>Courses</span>
					</NavLink>
				</li>

				<li>
					<NavLink to={`/blog`} className={(nav) => cx('sidebar-item', { active: nav.isActive })}>
						<QuestionAnswerIcon />
						<span>Blog</span>
					</NavLink>
				</li>

				<li>
					<NavLink to={`/recruitment`} className={(nav) => cx('sidebar-item', { active: nav.isActive })}>
						<WorkIcon />
						<span>Recruitment</span>
					</NavLink>
				</li>

				{role === 'admin' &&
					<Fragment>
						<li>
							<NavLink to={`/category`} className={(nav) => cx('sidebar-item', { active: nav.isActive })}>
								<CategoryIcon />
								<span>Category</span>
							</NavLink>
						</li>
	
						<li>
							<NavLink to={`/manage-acc-recruitment`} className={(nav) => cx('sidebar-item', { active: nav.isActive })}>
								<AccountCircleIcon />
								<span>Manage</span>
								<span>Account</span>
								<span>Employer</span>
							</NavLink>
						</li>
					</Fragment>
				}
			</ul>
		</div>
	);
}

export default Sidebar;