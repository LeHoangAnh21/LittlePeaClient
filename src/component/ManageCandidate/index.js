import { ApplicationContext } from '~/actions/context/ApplicationContext';
import { UserContext } from '~/actions/context/UserContext';
import { useContext, useEffect } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./ManageCandidate.module.scss"
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function ManageCandidate({ data }) {

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const {
		findApplicationId,
		setShowDeleteApplicationModal,
	} = useContext(ApplicationContext)

	const deleteApplication = applicationId => {
		findApplicationId(applicationId)
		setShowDeleteApplicationModal(true)
	}

	return (

		<Fragment>
			<div className={cx('application_item')} >
				<div className={cx('application_avatar')}>
					<CardMedia image={data.imageCV || ''} title='Title' className={cx('media')} />
					
					<Link to={`/list-candidate/${data._id}`} className={cx('button_learn')}>
						<Button>
							View now
						</Button>
					</Link>

					<Button className={cx('button_delete')} onClick={deleteApplication.bind(this, data._id)}>
						<DeleteIcon />
					</Button>

				</div>

				<div className={cx('candidate')}>
					{users.map((user) => {
						if (user._id === data.user) {
							return (
								<Fragment>
									{!user.avatar ?
										<img src={images.avatarDefault} alt="" className={cx('candidate-avatar')} />
										: <CardMedia image={user.avatar} title='avatar' className={cx('candidate-avatar')} />
									}
									{!user.fullname ?
										<span className={cx('candidate-fullname')}>{user.role}</span>
										: <span className={cx('candidate-fullname')}>{user.fullname}</span>
									}
								</Fragment>
							)
						}
					})}
				</div>
			</div>

		</Fragment>
	);
}

export default ManageCandidate;