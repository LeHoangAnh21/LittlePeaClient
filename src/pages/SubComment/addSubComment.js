import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap';
import { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SubComment.module.scss'
import { CommentContext } from '~/actions/context/CommentContext';
import { SubCommentContext } from '~/actions/context/SubCommentContext';
import { UserContext } from '~/actions/context/UserContext';

const cx = classNames.bind(styles)

const AddSubComment = () => {

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	let userComment = null

	const {
		commentState: { comment, comments },
		getComment,
	} = useContext(CommentContext)

	useEffect(() => {
		getComment()
	}, [])

	const {
		subCommentState: { subComment, subComments },
		getSubComment,
		showAddSubCommentModal,
		setShowAddSubCommentModal,
		addSubComment,
	} = useContext(SubCommentContext)

	useEffect(() => {
		getSubComment()
	}, [])

	users.map(user => {
		if (user._id === comment.user) {
			userComment = user.fullname
		}
	})

	console.log(userComment);

	const [newSubComment, setNewSubComment] = useState({
		content: '@' + userComment + ' ',
		commentId: comment._id
	})

	useEffect(() => setNewSubComment({ content: '@' + userComment + ' ', commentId: comment._id }), [comment._id])

	const { content, commentId } = newSubComment

	const onChangeNewSubComment = (e) =>
		setNewSubComment({ ...newSubComment, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddSubCommentData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addSubComment(newSubComment)
		setShowAddSubCommentModal(false)
		setNewSubComment({ content: '@' + userComment + ' ', commentId: comment._id })
		getSubComment()
	}

	const resetAddSubCommentData = () => {
		setNewSubComment({ content: '@' + userComment + ' ', commentId: comment._id })
		setShowAddSubCommentModal(false)
	}

	return (
		<Modal show={showAddSubCommentModal} onHide={closeModal}>

			<Modal.Header closeButton className={cx('modal-header-subcomment')}>
			</Modal.Header>

			<Form onSubmit={onSubmit}>
				<Modal.Body className={cx('modal-body-subcomment')}>
					<Form.Group>
						<Form.Control
							type='text'
							name='content'
							value={content}
							onChange={onChangeNewSubComment}
						/>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer className={cx('modal-footer-subcomment')}>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Submit
					</Button>

				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddSubComment;
