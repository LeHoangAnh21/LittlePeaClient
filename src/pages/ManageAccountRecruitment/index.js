import classNames from 'classnames/bind';
import styles from './ManageAccountRecruitment.module.scss'
import { useEffect, useContext, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { AuthContext } from '~/actions/context/AuthContext';
import { UserContext } from '~/actions/context/UserContext';
import UpdateRecruitmentModal from './UpdateRecruitment';
import moment from 'moment/moment';
import ManageAccRecruitItem from '~/component/ManageAccRecruitItem';

const cx = classNames.bind(styles)

function ManageAccountRecruitment() {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

	const {
		userState: { user, users },
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

	const [filterAccount, setFilterAccount] = useState('activated')
	const [showInfo, setShowInfo] = useState(false)

	const HandleShowInfor = () => {
		setShowInfo(true)
	}

	const HandleHideInfor = () => {
		setShowInfo(false)
	}

	const HandleActivated = () => {
		setFilterAccount('activated')
		HandleHideInfor()
	}

	const HandleExpired = () => {
		setFilterAccount('expired')
		HandleHideInfor()
	}

	const HandleCancelled = () => {
		setFilterAccount('blocked')
		HandleHideInfor()
	}

	const HandleWaitting = () => {
		setFilterAccount('waiting')
		HandleHideInfor()
	}

	const ActivatedList = []
	const ExpiredList = []
	const BlockedList = []
	const WaittingList = []

	users.map(userItem => {
		if (userItem.role === 'recruitment') {
			if (userItem.activation === 'activated'){
				const time = new Date(userItem.time)
				const timeNow = new Date()
				const timeFormat = moment(time).format('YYYY-MM-DD')
				const timeNowFormat = moment(timeNow).format('YYYY-MM-DD')

				if (timeFormat >= timeNowFormat){
					ActivatedList.push(userItem)
				} else {
					ExpiredList.push(userItem)
				}

			} else if (userItem.activation === 'blocked') {
				BlockedList.push(userItem)
			} else {
				WaittingList.push(userItem)
			}
		}
	})

	let body = null

	body = (
		<div>
			<div className={cx('option')}>
				<Button variant="success" className={cx('button_learn')} onClick={HandleActivated}>
					Activated
				</Button>

				<Button variant="info" className={cx('button_learn')} onClick={HandleExpired}>
					Expired
				</Button>

				<Button variant="info" className={cx('button_learn')} onClick={HandleCancelled}>
					Blocked
				</Button>

				<Button variant="info" className={cx('button_learn')} onClick={HandleWaitting}>
					Waitting
				</Button>
			</div>

			<div className={cx('list-recruitment')}>

				{/* Handle Activated Account */}
				{filterAccount === 'activated' && 
					<Fragment>
						{ActivatedList.map((userItem) => {

							return <ManageAccRecruitItem key={userItem._id} data={userItem} />
							// return (
							// 	<Fragment>
							// 		<div className={cx('list-header')}>
							// 			<span className={cx('fullname')}>{userItem.fullname}</span>
							// 			{showInfo === false ?
							// 				<ArrowDropDownIcon onClick={HandleShowInfor} />
							// 				: <ArrowDropUpIcon onClick={HandleHideInfor} />
							// 			}
							// 		</div>
							// 		{showInfo === true ?
							// 			<div className={cx('info-details')}>
							// 				<span>Username: {userItem.username}</span>
							// 				<span>Email: {userItem.email}</span>
							// 				<span>Workplace: {userItem.workplace}</span>
							// 				<span>Activation: {userItem.activation}</span>
							// 				<span>Activation Time: {time}</span>
							// 				<Button className={cx('button_edit')} onClick={chooseUser.bind(this, userItem._id)}>
							// 					Change the active state
							// 				</Button>
							// 			</div>
							// 			: null
							// 		}
							// 	</Fragment>
							// )
						})}
					</Fragment>
				}

				{/* Handle Expired Account */}
				{filterAccount === 'expired' &&
					<Fragment>
						{ExpiredList.map(userItem => {
							return <ManageAccRecruitItem key={userItem._id} data={userItem} />
						})}
					</Fragment>
				}

				{/* Handle Blocked Account */}
				{filterAccount === 'blocked' &&
					<Fragment>
						{BlockedList.map(userItem => {
							return <ManageAccRecruitItem key={userItem._id} data={userItem} />
						})}
					</Fragment>
				}

				{/* Handle Waitting Account */}
				{filterAccount === 'waiting' && 
					<Fragment>
						{WaittingList.map(userItem => {
							return <ManageAccRecruitItem key={userItem._id} data={userItem} />
						})}
					</Fragment>
				}

				{/* {users.map(userItem => {
					if (userItem.role === 'recruitment' && userItem.activation === filterAccount) {

						let time = null
						if (userItem.time !== null) {
							const timeFormat = new Date(userItem.time)
							time = moment(timeFormat).format('YYYY-MM-DD')
						} else {
							time = 'null'
						}

						return (
							<Fragment>
								<div className={cx('list-header')}>
									<span className={cx('fullname')}>{userItem.fullname}</span>
									{showInfo === false ?
										<ArrowDropDownIcon onClick={HandleShowInfor} />
										: <ArrowDropUpIcon onClick={HandleHideInfor} />
									}
								</div>
								{showInfo === true ?
									<div className={cx('info-details')}>
										<span>Username: {userItem.username}</span>
										<span>Email: {userItem.email}</span>
										<span>Workplace: {userItem.workplace}</span>
										<span>Activation: {userItem.activation}</span>
										<span>Activation Time: {time}</span>
										<Button className={cx('button_edit')} onClick={chooseUser.bind(this, userItem._id)}>
											Change the active state
										</Button>
									</div>
									: null
								}
							</Fragment>
						)
					}
				})} */}
			</div>
		</div>
	)

	return (
		<Fragment>
			{role === 'admin' ?
				<Fragment>
					{body}
				</Fragment>
				: <h1>Access denied</h1>
			}

			{user !== null && <UpdateRecruitmentModal />}
		</Fragment>
	);
}

export default ManageAccountRecruitment;