import classNames from 'classnames/bind';
import styles from './SubComment.module.scss'
import { Fragment, useContext, useEffect, useState } from 'react';
import { SubCommentContext } from '~/actions/context/SubCommentContext';
import { CommentContext } from '~/actions/context/CommentContext';
import { UserContext } from '~/actions/context/UserContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { CardMedia } from '@material-ui/core';
import images from '~/assets/images';
import Dropdown from 'react-bootstrap/Dropdown';

const cx = classNames.bind(styles)

function SubComment({dataId}) {

	const {
		authState: { user: { _id } }
	} = useContext(AuthContext)

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		findCommentId
	} = useContext(CommentContext)

	const {
		subCommentState: { subComments },
		getSubComment,
		setShowAddSubCommentModal
	} = useContext(SubCommentContext)

	useEffect(() => {
		getSubComment()
	}, [])

	const showModalSubComment = commentId => {
		findCommentId(commentId)
		setShowAddSubCommentModal(true)
	}

	return (  
		<div className={cx('list-comment')}>
			{subComments.map(subComment => {
				if (subComment && subComment.commentId === dataId) {
					return (
						<div className={cx('list-comment-item')}>
							{users.map((user) => {
								if (subComment.user === user._id) {
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
														<span>{subComment.content}</span>
													</div>
												</div>
												<div className={cx('comment-reply-btn')}>
													<span onClick={showModalSubComment.bind(this, dataId)}>Reply</span>
												</div>

											</div>
											<div className={cx('comment-option')}>
												{subComment.user === _id ?
													<Dropdown>
														<Dropdown.Toggle variant="light" id="dropdown-basic">

														</Dropdown.Toggle>

														<Dropdown.Menu>
															<Dropdown.Item>
																Update
															</Dropdown.Item>
															<Dropdown.Item>
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
					)
				}
			})}
		</div>
	);
}

export default SubComment;