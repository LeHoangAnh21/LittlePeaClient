import { Fragment, useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import moment from 'moment/moment';
import classNames from 'classnames/bind';
import styles from './ManageAccRecruitItem.module.scss'
import { UserContext } from '~/actions/context/UserContext';

const cx = classNames.bind(styles)

function ManageAccRecruitItem({data}) {

	const {
		getUser,
		findUserId,
		setShowUpdateUserModal
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	const chooseUser = userId => {
		findUserId(userId)
		setShowUpdateUserModal(true)
	}

	const [showInfo, setShowInfo] = useState(false)

	const HandleShowInfor = () => {
		setShowInfo(true)
	}

	const HandleHideInfor = () => {
		setShowInfo(false)
	}

	let time

	if(data.time !== null) {
		const timeFormat = new Date(data.time)
		time = moment(timeFormat).format('YYYY-MM-DD')
	} else {
		time = 'null'
	}

	return (
		<Fragment>
			<div className={cx('list-header')}>
				<span className={cx('fullname')}>{data.fullname}</span>
				{showInfo === false ?
					<ArrowDropDownIcon onClick={HandleShowInfor} />
					: <ArrowDropUpIcon onClick={HandleHideInfor} />
				}
			</div>
			{showInfo === true ?
				<div className={cx('info-details')}>
					<span>Username: {data.username}</span>
					<span>Email: {data.email}</span>
					<span>Workplace: {data.workplace}</span>
					<span>Activation: {data.activation}</span>
					<span>Activation Time: {time}</span>
					<Button className={cx('button_edit')} onClick={chooseUser.bind(this, data._id)}>
						Change the active state
					</Button>
				</div>
				: null
			}
		</Fragment>
	)
}

export default ManageAccRecruitItem;