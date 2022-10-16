/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { BlogContext } from '~/actions/context/BlogContext';
import { AuthContext } from '~/actions/context/AuthContext';
import ManageBlogItem from '~/component/ManageBlogItem';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import styles from './ManageBlog.module.scss'
import UpdateBlogModal from './UpdateBlog';
import DeleteBlogModal from './DeleteBlog';

const cx = classNames.bind(styles)

function ManageBlog() {

	const {
		authState: { user: { _id } },
	} = useContext(AuthContext)

	const {
		blogState: { blog, blogs, blogsLoading },
		setShowAddBlogModal,
		getBlog,
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	let body = null
	let blogList = []

	// eslint-disable-next-line no-lone-blocks
	{blogs.map(blog => {
		if (blog.user === _id){
			blogList.push(blog)
		}
	})}

	if (blogList.length === 0) {
		body = (
			<h4>No blog posted.</h4>
		)
	} else {
		body = (
			<div className={cx('list_blogs')}>
				{blogList.map((blog) => {
					return <ManageBlogItem key={blog._id} data={blog} />
				})}
			</div>
		)
	}

	return (
		<div className={cx('blog_body')}>

			<h1 className={cx('header_blogs')}>YOUR BLOG</h1>

			{body}

			{blog !== null && <UpdateBlogModal />}

			{blog !== null && <DeleteBlogModal />}
		</div>
	);
}

export default ManageBlog;
