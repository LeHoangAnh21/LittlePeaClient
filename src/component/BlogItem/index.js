// import { Fragment } from 'react'
import { CategoryContext } from '~/actions/context/CategoryContext';
import { BlogContext } from '~/actions/context/BlogContext';
import { useContext } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./BlogItem.module.scss"
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function BlogItem({ data }) {

	const {
		categoryState: { categories },
	} = useContext(CategoryContext)

	const {
		findBlogId,
		setShowUpdateBlogModal,
		setShowDeleteBlogModal,
	} = useContext(BlogContext)

	const chooseBlog = blogId => {
		findBlogId(blogId)
		setShowUpdateBlogModal(true)
	}

	const deleteBlog = blogId => {
		findBlogId(blogId)
		setShowDeleteBlogModal(true)
	}

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

	return (
		<Fragment>
			<div className={cx('blog_item')} >
				<div className={cx('blog_avatar')}>
					

					<div className={cx('header_blog')}>
						<Link to={`/blog/${data._id}`} className={cx('button_learn')}>
							<h5 className={cx('title')}>{data.title}</h5>
						</Link>

						<div className={cx('button')}>
							<Button className={cx('button_edit')} onClick={chooseBlog.bind(this, data._id)}>
								<EditIcon />
							</Button>
					
							<Button className={cx('button_delete')} onClick={deleteBlog.bind(this, data._id)}>
								<DeleteIcon />
							</Button>
						</div>
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
					<img src={images.founder} alt="" />
					<span>Le Hoang Anh</span>
				</div>
			</div>

		</Fragment>
	);
}

export default BlogItem;