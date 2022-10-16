import Modal from 'react-bootstrap/Modal'
import { Fragment, useContext, useEffect, useState } from 'react';
import { CardMedia } from '@material-ui/core';
import { CommentContext } from '~/actions/context/CommentContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { UserContext } from '~/actions/context/UserContext';
import { SubCommentContext } from '~/actions/context/SubCommentContext';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss'
import images from '~/assets/images';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import UpdateComment from './UpdateComment';
import SubComment from '../SubComment';
import AddSubComment from '../SubComment/addSubComment';

const cx = classNames.bind(styles)

function Comment() {

	const { id } = useParams();

	const blogId = id;

	const {
		authState: {user: { _id, avatar }}
	} = useContext(AuthContext)

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		commentState: { comment, comments },
		getComment,
		showCommentModal,
		setShowCommentModal,
		addComment,
		findCommentId,
		setShowUpdateCommentModal,
		deleteComment
	} = useContext(CommentContext)

	useEffect(() => {
		getComment()
	}, [])

	const [showComments, setShowComments] = useState(false)
	const showListSubComment = () => setShowComments(true)
	const hideListSubComment = () => setShowComments(false)

	// Handle Add Comment
	const [newComment, setNewComment] = useState({
		content: '',
		blog: blogId
	})

	const { content, blog } = newComment

	const onChangeNewComment = (e) =>
		setNewComment({ ...newComment, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddCommentData()
		setShowComments(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addComment(newComment)
		setNewComment({ content: '', blog: blogId })
	}

	const resetAddCommentData = () => {
		setNewComment({ content: '', blog: blogId })
		setShowCommentModal(false)
	}

	//Handle Update Comment
	const chooseComment = commentId => {
		findCommentId(commentId)
		setShowUpdateCommentModal(true)
	}

	//Handle Sub Comment Modal

	const {
		setShowAddSubCommentModal
	} = useContext(SubCommentContext)

	const showModalSubComment = commentId => {
		findCommentId(commentId)
		setShowAddSubCommentModal(true)
	}

	return (  
		<Modal show={showCommentModal} onHide={closeModal} className={cx('modal')} size='lg'>
			<Modal.Header closeButton>
				<h3>Comment</h3>
			</Modal.Header>

			<Modal.Body>
				<div>
					<div className={cx('comment-input')}>
						<div className={cx('user-avatar')}>
							{!avatar ?
								<img src={images.avatarDefault} alt="" className={cx('avatar')} />
								: <CardMedia image={avatar} title='avatar' className={cx('avatar')} />
							}
						</div>

						<Form className={cx('form')} onSubmit={onSubmit}>
							<Modal.Body className={cx('modal-body')}>
								<Form.Group>
									<Form.Control
										as='textarea'
										rows={1}
										placeholder='Write a comment...'
										name='content'
										value={content}
										onChange={onChangeNewComment}
									/>
								</Form.Group>
							</Modal.Body>

							<Modal.Footer className={cx('modal-footer')}>

								<Button variant='primary' type='submit'>
									Submit
								</Button>

							</Modal.Footer>
						</Form>
					</div>

					{comment !== null && <UpdateComment />}

					<div className={cx('list-comment')}>
						{comments.map((commentItem) => {
							if (commentItem.blog === blogId){
								return (
									<Fragment>
										<div className={cx('list-comment-item')}>
											{users.map((user) => {
												if (commentItem.user === user._id) {
													return (
														<Fragment>
															<div className={cx('user-avatar')}>
																{!user.avatar ?
																	<img src={images.avatarDefault} alt="" className={cx('avatar')} />
																	: <CardMedia image={user.avatar} title='avatar' className={cx('avatar')} />
																}
															</div>
															<div className={cx('comment-body')}>
																<div className={cx('comment-content')}>
																	<div className={cx('comment-user')}>
																		<span>{user.fullname}</span>
																	</div>
																	<div className={cx('comment-text')}>
																		<span>{commentItem.content}</span>
																	</div>
																</div>
																<div className={cx('comment-reply-btn')}>
																	<span onClick={showModalSubComment.bind(this, commentItem._id)}>Reply</span>
																</div>

																<div>
																	{showComments ? 
																		<div>
																			<span style={{cursor: 'pointer'}} onClick={hideListSubComment}>Hide comment</span>
																			<SubComment dataId={commentItem._id} /> 
																		</div>
																		: <span style={{ cursor: 'pointer' }} onClick={showListSubComment}>Show comment</span>
																	}
																</div>
																
																{comment !== null && <AddSubComment />}

															</div>
															
															<div className={cx('comment-option')}>
																{commentItem.user === _id ? 
																	<Dropdown>
																		<Dropdown.Toggle variant="light" id="dropdown-basic">
																			
																		</Dropdown.Toggle>
		
																		<Dropdown.Menu>
																			<Dropdown.Item onClick={chooseComment.bind(this, commentItem._id)}>
																				Update
																			</Dropdown.Item>
																			<Dropdown.Item onClick={deleteComment.bind(this, commentItem._id)}>
																				Delete
																			</Dropdown.Item>
																		</Dropdown.Menu>
																	</Dropdown>
																	: null
																}
															</div>
														</Fragment>
													)
												}
											})}
										</div>
									</Fragment>
								)
							}
						})}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Comment;