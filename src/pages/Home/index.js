import { AuthContext } from '~/actions/context/AuthContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { BlogContext } from '~/actions/context/BlogContext';
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { Toast } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss'
import Slider from './Slider';
import CourseItem from '~/component/CourseItem';
import BlogItem from '~/component/BlogItem';
import RecruitmentItem from '~/component/RecruitmentItem';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import WorkIcon from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Home() {

	const {
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuthContext)

	//Handle list courses
	const {
		courseState: { courses },
		getCourses,
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	// Use reduceRight and spread
	const revCourses = courses.reduceRight((acc, value) => {
		return [...acc, value];
	}, []);

	//Handle list blogs
	const {
		blogState: { blogs },
		getBlog,
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])

	const revBlogs = blogs.reduceRight((acc, value) => {
		return [...acc, value];
	}, []);

	//Handle list recruitments
	const {
		recruitmentState: { recruitments },
		getRecruitment,
	} = useContext(RecruitmentContext)

	useEffect(() => {
		getRecruitment()
	}, [])

	const revRecruitments = recruitments.reduceRight((acc, value) => {
		return [...acc, value];
	}, []);

	return (
		<div>	
			<div className={cx('slider')}>
				<Slider />
			</div>

			<div className={cx('homepage')}>

				<div className={cx('course-component')}>
					<div className={cx('homepage-title-header')}>
						<h2 className={cx('homepage-title')}>
							<MenuBookIcon style={{marginRight: '15px'}} />
							The newest courses
						</h2>
						<Link className={cx('more-btn')} to={`/courses`}>
							<span>More...</span>
						</Link>
					</div>
					<div className={cx('list_courses')}>
						{revCourses.map((course, index) => {
							console.log(index);
							if (course.status === 'Public' && index + 1 < 5) {
								return (
									<CourseItem key={course._id} data={course} />
								)
							}
						})}
					</div>
				</div>

				<div className={cx('blog-component')}>
					<div className={cx('homepage-title-header')}>
						<h2 className={cx('homepage-title')}>
							<QuestionAnswerIcon style={{ marginRight: '15px' }} />
							The newest blogs
						</h2>
						<Link className={cx('more-btn')} to={`/blog`}>
							<span>More...</span>
						</Link>
					</div>
					
					<div className={cx('list_blogs')}>
						{revBlogs.map((blog, index) => {
							if(index + 1 < 5){
								return <BlogItem key={blog._id} data={blog} />
							}
						})}
					</div>
				</div>

				<div className={cx('recruitment-component')}>
					<div className={cx('homepage-title-header')}>
						<h2 className={cx('homepage-title')}>
							<WorkIcon style={{ marginRight: '15px' }} />
							The newest recruitments
						</h2>
						<Link className={cx('more-btn')} to={`/recruitment`}>
							<span>More...</span>
						</Link>
					</div>
					<div className={cx('list_recruitments')}>
						{revRecruitments.map((recruitment, index) => {
							if (recruitment.status === 'Public' && index + 1 < 5) {
								return <RecruitmentItem key={recruitment._id} data={recruitment} />
							}
						})}
					</div>
				</div>

			</div>

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
	)
}

export default Home;