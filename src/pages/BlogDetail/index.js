import { BlogContext } from '~/actions/context/BlogContext';
import { UserContext } from '~/actions/context/UserContext';
import { CommentContext } from '~/actions/context/CommentContext';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss'
import { useParams } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Comment from '../Comment';

const cx = classNames.bind(styles)

function BlogDetail() {

	const { id } = useParams();

	const blogId = id;

	const {
		userState: { users, },
		getUser,
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		setShowCommentModal
	} = useContext(CommentContext)

	const {
		blogState: { blogs, },
		getBlog,
		likeBlog
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	const [tym, setTym] = useState(false);
	const [numberTym, setNumberTym] = useState(0);

	const handleReact = async event => {
		setTym(!tym)

		if (tym === true) {
			setNumberTym(numberTym - 1)
		} else {
			setNumberTym(numberTym + 1)
		}
		event.preventDefault()
		await likeBlog(blogId)
		getBlog()
	}

	let body = null

	if (blogs !== null) {
		body = (
			<Fragment>
				{blogs.map((blog) => {
					if (blogId === blog._id) {
						return (

							<div className={cx('blog_detail')}>

								<div className={cx('info')}>
									<div className={cx('blogger')}>
										{users.map(user => {
											if(blog.user === user._id){
												return (
													<Fragment>
														<CardMedia image={user.avatar || 'null'} title='Avatar' className={cx('avatar')} />
														<span className={cx('fullname')}>{user.fullname}</span>
													</Fragment>
												)
											}
										})}
									</div>
						
									<div className={cx('react')}>
										<div className={cx('react_tym')}>
											<FavoriteIcon onClick={handleReact} className={cx({ tym: tym })} />
											<span>{blog.likeCount}</span>
										</div>
						
										<div className={cx('react_comment')} onClick={setShowCommentModal.bind(this, true)}>
											<ChatBubbleIcon />
										</div>
									</div>
								</div>

								<div className={cx('intro')}>
									<div key={blog._id} className={cx('blog_content')}>
										<div className={cx('title_blog')}>
											<span>{blog.title}</span>
										</div>

										{blog.image !== '' && <CardMedia image={blog.image || 'null'} title='Title' className={cx('media')} />}
		
										<div className={cx('content_blog')}>
											<span>{blog.content || 'None'}</span>
										</div>
									</div>

									<div className={cx('manage')}>
										{/* <ManageBlog key={blog._id} data={blog} /> */}
									</div>
								</div>

							</div>
						)
					}
				})}
			</Fragment>
		)
	}


	return (
		<Fragment>
			{ body }

			<Comment />
		</Fragment>
	);
}

export default BlogDetail;