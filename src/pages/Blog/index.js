/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { BlogContext } from '~/actions/context/BlogContext';
import BlogItem from '~/component/BlogItem';
import AddBlogModal from './AddBlog';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss'

const cx = classNames.bind(styles)

function Blog() {

	const {
		blogState: { blogs },
		setShowAddBlogModal,
		getBlog,
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	let body = null

	if (blogs.length === 0) {
		body = (
			<h4>No blog posted.</h4>
		)
	} else {
		body = (
			<div className={cx('list_blogs')}>
				{blogs.map((blog) => {
					return <BlogItem key={blog._id} data={blog} />
				})}
			</div>
		)
	}

	return (
		<div className={cx('blog_body')}>

			<h1 className={cx('header_blogs')}>LIST BLOG</h1>

			<div className={cx('option')}>

				<Link to={`/manage-blog`} className={cx('button_learn')}>
					<Button variant="success">
						Manage your blog
					</Button>
				</Link>
			</div>

			{body}

			<Fragment>
				<Button
					className={cx('btn-floating')}
					onClick={setShowAddBlogModal.bind(this, true)}
				>
					<AddIcon />
				</Button>
			</Fragment>

			<AddBlogModal />
		</div>
	);
}

export default Blog;
