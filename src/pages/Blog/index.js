import { useEffect, useContext, useState, useRef } from 'react';
import { BlogContext } from '~/actions/context/BlogContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import BlogItem from '~/component/BlogItem';
import AddBlogModal from './AddBlog';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss'
import { Toast } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { apiURL } from '~/api/request';
import axios from 'axios';
import UpdateBlogModal from '../ManageBlog/UpdateBlog';

const cx = classNames.bind(styles)

function Blog() {

	const inputRef = useRef()

	const {
		blogState: { blog, blogs },
		setShowAddBlogModal,
		getBlog,
		showToast: { show, message, type },
		setShowToast	
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	const revBlogs = blogs.reduceRight((acc, value) => {
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
	const [blogSearch, setBlogSearch] = useState([])
	const [searchText, setSearchText] = useState('')

	let body = null

	if (blogs.length === 0) {
		body = (
			<h4>No blog posted.</h4>
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

				<div className={cx('list_blogs')}>
					{revBlogs.map((blog) => {
						if (blog.status === 'Public') {
							if (filterCategory === 'All') {
								return <BlogItem key={blog._id} data={blog} />
							} else {
								if (blog.category === filterCategory) {
									return <BlogItem key={blog._id} data={blog} />
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
				let result = await axios.post(`${apiURL}/blog/search/${encodeURIComponent(key)}`)

				if (result) {
					setBlogSearch(result.data)
				}
			} else {
				setBlogSearch([])
			}

		}

		handleSearch()

	}, [searchText])

	return (
		<div className={cx('blog_body')}>

			<div>
				<h1 className={cx('header_blogs')}>LIST BLOG</h1>
	
				<div className={cx('option')}>
	
					<Link to={`/manage-blog`} className={cx('button_learn')}>
						<Button variant="success">
							Manage your blog
						</Button>
					</Link>
				</div>

				{showFilter === false ?
					<Button variant="success" style={{ marginRight: '10px' }} onClick={() => {
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

			{blogSearch.length !== 0 ?
				<div className={cx('list_blogs')}>
					{blogSearch.map((blog) => {
						return <BlogItem key={blog._id} data={blog} />
					})}
				</div>
				: null
			}

			<Fragment>
				<Button
					className={cx('btn-floating')}
					onClick={setShowAddBlogModal.bind(this, true)}
				>
					<AddIcon />
				</Button>
			</Fragment>

			<AddBlogModal />
			{blog !== null && <UpdateBlogModal />}

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

export default Blog;
