import { useEffect, useContext, useState, useRef } from 'react';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { UserContext } from '~/actions/context/UserContext';
import RecruitmentItem from '~/component/RecruitmentItem';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import styles from './Recruitment.module.scss'
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { apiURL } from '~/api/request';
import axios from 'axios';
import UpdateRecruitmentModal from '../ManageRecruitment/UpdatePost';
import moment from 'moment/moment';

const cx = classNames.bind(styles)

function Recruitment() {

	const inputRef = useRef()

	const {
		authState: { user: { role, activation, time } },
	} = useContext(AuthContext)

	const {
		userState: { users },
		getUser
	} = useContext(UserContext)

	useEffect(() => {
		getUser()
	}, [])

	// let activateStatus = null
	// const activateTime = moment(time).format('YYYY-MM-DD');
	// const timeNow = moment(new Date()).format('YYYY-MM-DD')

	// if (activation === 'activated') {
	// 	if (activateTime >= timeNow) {
	// 		activateStatus = 'approved'
	// 	} else {
	// 		activateStatus = 'expired'
	// 	}
	// } else if (activation === 'activated') {
	// 	activateStatus = 'blocked'
	// } else {
	// 	activateStatus = 'waiting'
	// }

	const {
		recruitmentState: { recruitment, recruitments },
		getRecruitment,
		showToast: { show, message, type },
		setShowToast	
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	const revRecruitments = recruitments.reduceRight((acc, value) => {
		return [...acc, value];
	}, []);

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const [filterCategory, setFilterCategory] = useState('All')
	const [showFilter, setShowFilter] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [recruitmentSearch, setRecruitmentSearch] = useState([])
	const [searchText, setSearchText] = useState('')

	let body = null

	if (recruitments.length === 0) {
		body = (
			<h1>No recruitment posted.</h1>
		)
	} else {
		body = (
			<div>
				{showFilter === true ?
					<div className={cx('filter')}>
						{filterCategory === 'All' ?
							<span className={cx('category', 'color')} onClick={() => setFilterCategory('All')}>All</span>
							: <span className={cx('category')} onClick={() => setFilterCategory('All')}>All</span>
						}
						{categories.map((category) => {
							if (category._id === filterCategory) {
								return (
									<span className={cx('category', 'color')} onClick={() => setFilterCategory(category._id)}>{category.title}</span>
								)
							} else {
								return (
									<span className={cx('category')} onClick={() => setFilterCategory(category._id)}>{category.title}</span>
								)
							}
						})}
					</div>
					: null
				}

				<div className={cx('list_recruitments')}>
					{revRecruitments.map((recruitment) => {
						let statusRecruitments = null
						let userStatus = null
						let timeStatus = false

						const deadlineDay = new Date(recruitment.deadline)
						const current = new Date()

						const deadlineDate = moment(deadlineDay).format('YYYY-MM-DD')
						const currentDay = moment(current).format('YYYY-MM-DD')

						if (deadlineDate < currentDay) {
							statusRecruitments = 'Hide'
						} else {
							statusRecruitments = 'Public'
						}

						users.map(user => {

							if(user._id === recruitment.user) {
								userStatus = user.activation

								const activateTime = moment(user.time).format('YYYY-MM-DD');
								const timeNow = moment(new Date()).format('YYYY-MM-DD')
								console.log(activateTime);
								console.log(timeNow);
								
								if (activateTime >= timeNow) {
									timeStatus = true
								}
							}

						})

						if (statusRecruitments === 'Public' && userStatus === 'activated' && timeStatus === true) {
							if (filterCategory === 'All') {
								return <RecruitmentItem key={recruitment._id} data={recruitment} />
							} else {
								if (recruitment.category === filterCategory) {
									return <RecruitmentItem key={recruitment._id} data={recruitment} />
								}
							}
						} 
					})}
				</div>
			</div>
		)
	}

	useEffect(() => {
		const handleSearch = async (e) => {
			let key = searchText

			if (key) {
				let result = await axios.post(`${apiURL}/recruitment/search/${encodeURIComponent(key)}`)

				if (result) {
					setRecruitmentSearch(result.data)
				}
			} else {
				setRecruitmentSearch([])
			}

		}

		handleSearch()

	}, [searchText])

	return (
		<div className={cx('recruitment_body')}>

			<div>
				<p className={cx('header_recruitments')}>RECRUITMENT</p>
	
				{role === 'recruitment' &&
					<div className={cx('option')}>
	
						<Link to={`/manage-recruitment`} className={cx('button_learn')}>
							<Button variant="success">
								Manage Post
							</Button>
						</Link>
	
						<Link to={`/list-candidate`} className={cx('button_learn')}>
							<Button variant="info">
								List Candidate
							</Button>
						</Link>
	
					</div>
				}

				{showFilter === false ?
					<Button variant="success" style={{ marginRight: '10px' }} onClick={() => {
							setShowFilter(true)
							setShowSearch(false)
						}}
					>
						Open Filter
					</Button>
					:
					<Button variant="success" style={{ marginRight: '10px' }} onClick={() => setShowFilter(false)}>
						Close Filter
					</Button>
				}

				{showSearch === false ?
					<Button variant="success" onClick={() => {
						setShowSearch(true)
						setFilterCategory(null)
						setShowFilter(false)
					}}
					>
						Open Search
					</Button>
					:
					<Button variant="success" onClick={() => {
						setShowSearch(false)
						setFilterCategory('All')
					}}
					>
						Close Search
					</Button>
				}

			</div>

			{body}

			{showSearch === true ?
				<div className={cx('search')}>
					<div className={cx('search-component')}>
						<SearchIcon />
						<input
							ref={inputRef}
							value={searchText}
							className={cx('input')}
							placeholder='Search....'
							onChange={(e) => setSearchText(e.target.value.trim())}
						/>

						{!!searchText &&
							<CancelIcon className={cx('cancel')} onClick={() => {
								setSearchText('')
								inputRef.current.focus()
							}} />
						}
					</div>
				</div>
				: null
			}

			{role === 'admin' &&
				<Fragment>
					{recruitment !== null && <UpdateRecruitmentModal />}
				</Fragment>
			}

			{recruitmentSearch.length !== 0 ?
				<div className={cx('list_recruitments')}>
					{recruitmentSearch.map((recruitment) => {
						if (recruitment.status === 'Public') {
							return <RecruitmentItem key={recruitment._id} data={recruitment} />
						}
					})}
				</div>
				: null
			}

			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>

		</div>
	);
}

export default Recruitment;
