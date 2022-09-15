/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { BlogContext } from '~/actions/context/BlogContext';
import BlogItem from '~/component/BlogItem';
import AddBlogModal from './AddBlog';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss'
import UpdateBlogModal from './UpdateBlog';
import DeleteBlogModal from './DeleteBlog';

const cx = classNames.bind(styles)

function Blog() {

	const {
		blogState: { blog, blogs, blogsLoading },
		setShowAddBlogModal,
		getBlog,
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	let body = null

	if (blogs.length === 0) {
		body = (
			<h1>No blog posted.</h1>
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

			<p className={cx('header_blogs')}>LIST BLOG</p>

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

			{blog !== null && <UpdateBlogModal />}

			{blog !== null && <DeleteBlogModal />}
		</div>
	);
}

export default Blog;
