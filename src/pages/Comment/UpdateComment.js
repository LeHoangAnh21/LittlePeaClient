import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss'
import { Fragment, useContext, useEffect, useState } from 'react';
import { CommentContext } from '~/actions/context/CommentContext';

const cx = classNames.bind(styles)

const UpdateComment = () => {

	const {
		commentState: { comment, comments },
		getComment,
		updateComment,
		showUpdateCommentModal,
		setShowUpdateCommentModal,
		findCommentId
	} = useContext(CommentContext)

	useEffect(() => {
		getComment()
	}, [])

	//Handle Update 
	const [updatedComment, setUpdatedComment] = useState(comment)

	useEffect(() => setUpdatedComment(comment), [comment])

	const { content, blog } = updatedComment
	const onUpdateComment = (e) =>
		setUpdatedComment({ ...updatedComment, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedComment(comment)
		setShowUpdateCommentModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateComment(updatedComment)
		setShowUpdateCommentModal(false)
		setUpdatedComment({ content: '', blog: '' })
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return ( 
		<Modal show={showUpdateCommentModal} onHide={closeModal} className={cx('form-update')}>

			<Modal.Header closeButton className={cx('modal-header-update')}>
			</Modal.Header>

			<Form onSubmit={onSubmit}>
				<Modal.Body className={cx('modal-body-update')}>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={1}
							placeholder='Write a comment...'
							name='content'
							value={content}
							onChange={onUpdateComment}
						/>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer className={cx('modal-footer-update')}>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Submit
					</Button>

				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default UpdateComment;