import { BlogContext } from '~/actions/context/BlogContext';
import { UserContext } from '~/actions/context/UserContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { CommentContext } from '~/actions/context/CommentContext';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss'
import { Link, useParams } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Comment from '../Comment';

const cx = classNames.bind(styles)

function BlogDetail() {

	const { id } = useParams();

	const blogId = id;
	let posterId = null

	const {
		authState: { user: {_id} },
	} = useContext(AuthContext)

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
		likeBlog,
		unlikeBlog
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	const [tym, setTym] = useState();

	let likeArray
	let idUser = false
	// console.log(tym);

	blogs.map((blog) => {
		if (blogId === blog._id) {
			likeArray = blog.like
		}
	})

	const handleCheckUserId = () => {
		if(likeArray){
			likeArray.map(likeUser => {
				console.log(likeUser === _id);
				if (likeUser === _id) {
					idUser = true
					setTym(true)
				} else {
					idUser = false
				}
			})
		}
	}

	useEffect(() => {
		handleCheckUserId()
	}, [likeArray])

	const handleReact = async event => {
			
		handleCheckUserId()

		if (idUser === true){
			setTym(false)
			await unlikeBlog(blogId)
		}

		if (idUser === false) {
			setTym(true)
			await likeBlog(blogId)
		}

		event.preventDefault()
		getBlog()
	}

	let body = null

	if (blogs !== null) {
		body = (
			<Fragment>
				{blogs.map((blog) => {
					if (blogId === blog._id) {
						posterId = blog.user
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
											{tym === true ? 
												<Fragment>
													<FavoriteIcon onClick={handleReact} className={cx('tym')} /> 
												</Fragment> :
												<Fragment>
													<FavoriteIcon onClick={handleReact} className={cx('un-tym')} />
												</Fragment>
											}
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

	let offer = null
	let offerList = []

	console.log(posterId);

	if (blogs !== null && posterId !== null) {
		blogs.map((blog) => {
			if (blog.user === posterId && blog._id !== blogId && blog.status === 'Public') {
				offerList.push(blog)
			}
		})
	}

	if (offerList.length !== 0) {
		offer = (
			<div className={cx('offer')}>
				<span className={cx('offer-title')}>Blogs with the same author:</span>

				{offerList.map(offerListItem => {
					return (
						<Link to={`/blog/${offerListItem._id}`}>
							<span className={cx('offer-blog-title')}>{offerListItem.title}</span>
						</Link>
					)
				})}
			</div>
		)
	} else {
		offer = (
			<div className={cx('offer')}>
				<span className={cx('offer-title')}>Blogs with the same author:</span>
				<span className={cx('offer-blog-title')}>The author has no other blogs.</span>
			</div>
		)
	}

	return (
		<Fragment>
			{ body }

			{ offer }

			<Comment />
		</Fragment>
	);
}

export default BlogDetail;