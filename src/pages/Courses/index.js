import { useEffect, useContext, useState, useRef } from 'react';
import { CourseContext } from '~/actions/context/CourseContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import CourseItem from '~/component/CourseItem';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { apiURL } from '~/api/request';
import axios from 'axios';
import UpdateCourse from '../Manage/UpdateCourse';

const cx = classNames.bind(styles)

function Courses() {

	const inputRef = useRef()

	const {
		authState: { user: {role} },
	} = useContext(AuthContext)

	const {
		categoryState: { categories },
		getCategories,
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	const {
		courseState: { course, courses },
		getCourses,
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	// Use reduceRight and spread
	const revCourses = courses.reduceRight((acc, value) => {
		return [...acc, value];
	}, []);

	const [filterCategory, setFilterCategory] = useState('All')
	const [showFilter, setShowFilter] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [courseSearch, setCourseSearch] = useState([])	
	const [searchText, setSearchText] = useState('')

	let body = null

	if (courses.length === 0) {
		body = (
			<h1>No courses posted.</h1>
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
							if (category._id === filterCategory){
								return (
									<span className={cx('category', 'color')} onClick={() => setFilterCategory(category._id)}>{category.title}</span>
								)
							}else{
								return (
									<span className={cx('category')} onClick={() => setFilterCategory(category._id)}>{category.title}</span>
								)
							}
						})}
					</div>
					: null
				}

				<div className={cx('list_courses')}>
					{revCourses.map((course) => {
						if(course.status === 'Public'){
							if (filterCategory === 'All'){
								return (
									<CourseItem key={course._id} data={course} />
								)
							}else{
								if (course.category === filterCategory){
									return (
										<CourseItem key={course._id} data={course} />
									)
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
	
			if(key){
				let result = await axios.post(`${apiURL}/courses/search/${encodeURIComponent(key)}`)
		
				if (result) {
					setCourseSearch(result.data)
				}
			}else{
				setCourseSearch([])
			}
	
		}
		
		handleSearch()

	}, [searchText])


	return (
		<div className={cx('course_body')}>

			<div>
				<p className={cx('header_courses')}>LIST COURSES</p>

				{role === 'creator' &&
					<div className={cx('option')}>

						<Link to={`/manage`} className={cx('button_learn')}>
							<Button variant="success">
								Manage Course
							</Button>
						</Link>

					</div>
				}

				{showFilter === false ?
					<Button variant="success" style={{marginRight: '10px'}} onClick={() => {
							setShowFilter(true)
							setShowSearch(false) 
							setFilterCategory('All')
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
						<SearchIcon/>
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
							}}/>
						}
					</div>
				</div>
				: null
			}

			{courseSearch.length !== 0 ? 
				<div className={cx('list_courses')}>
					{courseSearch.map(course => {
						if (course.status === 'Public') {
							return (
								<CourseItem key={course._id} data={course} />
							)
						}
					})}
				</div>
				: null
			}

			{role === 'admin' && course !== null && <UpdateCourse />}
			
		</div>
	);
}

export default Courses;