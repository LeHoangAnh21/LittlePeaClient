// import { Fragment } from 'react'
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { UserContext } from '~/actions/context/UserContext';
import { BlogContext } from '~/actions/context/BlogContext';
import { useContext, useEffect } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./BlogItem.module.scss"
import Button from 'react-bootstrap/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function BlogItem({ data }) {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		categoryState: { categories }
	} = useContext(CategoryContext)

	//Cal Day
	const get_day_of_time = (d1, d2) => {
		let ms1 = d1.getTime();
		let ms2 = d2.getTime();
		return Math.ceil((ms2 - ms1) / (60 * 1000));
	};

	let createDay = new Date(data.createdAt);

	let today = new Date();

	let time = get_day_of_time(createDay, today)

	let timePost = null

	if(time === 1){
		timePost = (
			<p>{time} minute ago</p>
		)
	}
	else if (time < 60){
		timePost = (
			<p>{time} minutes ago</p>
		)
	}
	else if (time >= 60 && time < 120){
		const hour = Math.floor(time / 60)
		timePost = (
			<p>{hour} hour ago</p>
		)
	}
	else if (time >= 120 && time < 1440) {
		const hour = Math.floor(time / 60)
		timePost = (
			<p>{hour} hours ago</p>
		)
	}
	else if (time >= 1440 && time < 2880) {
		const day = Math.floor(time / 1440)
		timePost = (
			<p>{day} day ago</p>
		)
	}
	else if (time >= 2880){
		const day = Math.floor(time / 1440)
		timePost = (
			<p>{day} days ago</p>
		)
	}

	const {
		findBlogId,
		setShowUpdateBlogModal,
	} = useContext(BlogContext)

	const chooseBlog = blogId => {
		findBlogId(blogId)
		setShowUpdateBlogModal(true)
	}

	return (
		<Fragment>
			<div className={cx('blog_item')} >
				<div className={cx('blog_avatar')}>
					

					<div className={cx('header_blog')}>
						<Link to={`/blog/${data._id}`} className={cx('button_learn')}>
							<h5 className={cx('title')}>{data.title}</h5>
						</Link>

						{role === 'admin' &&
							<Button className={cx('button_delete')} onClick={chooseBlog.bind(this, data._id)}>
								<EditIcon />
							</Button>
						}
					</div>

					<p className={cx('content')}>{data.content}</p>

					{timePost}

					<span className={cx('category')}>
						{categories.map((category) => {
							let categoryTitle = null
							if (category._id === data.category) {
								categoryTitle = category.title
							}
							return categoryTitle
						})}
					</span>
					
				</div>

				<div className={cx('blogger')}>
					{users.map((user) => {
						if (user._id === data.user) {
							return (
								<Fragment>
									{!user.avatar ?
										<img src={images.avatarDefault} alt="" className={cx('blogger-avatar')} />
										: <CardMedia image={user.avatar} title='avatar' className={cx('blogger-avatar')} />
									}
									{!user.fullname ?
										<span className={cx('blogger-fullname')}>{user.role}</span>
										: <span className={cx('blogger-fullname')}>{user.fullname}</span>
									}
								</Fragment>
							)
						}
					})}
				</div>
			</div>

		</Fragment>
	);
}

export default BlogItem;