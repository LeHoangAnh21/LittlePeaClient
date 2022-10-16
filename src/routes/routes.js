import routeConfig from '~/config/routes'

import Intro from '~/pages/Intro'
import Home from '~/pages/Home'
import ManageCategory from '~/pages/ManageCategory'
import Courses from '~/pages/Courses'
import Lesson from '~/pages/Lesson'
import Blog from '~/pages/Blog'
import BlogDetail from '~/pages/BlogDetail'
import Recruitment from '~/pages/Recruitment'
import RecruitmentDetail from '~/pages/RecruitmentDetail'
import ListCandidate from '~/pages/ListCandidate'
import Manage from '~/pages/Manage'
import ManageLesson from '~/pages/ManageLesson'
import PersonalPage from '~/pages/PersonalPage'
import ManageBlog from '~/pages/ManageBlog'
import ManageRecruitment from '~/pages/ManageRecruitment'

const publicRoutes = [
	{ path: routeConfig.intro, component: Intro },
];

const privateRoutes = [

	{ path: routeConfig.home, component: Home },
	{ path: routeConfig.category, component: ManageCategory },
	{ path: routeConfig.courses, component: Courses },
	{ path: routeConfig.lesson, component: Lesson },
	{ path: routeConfig.blog, component: Blog },
	{ path: routeConfig.blogDetail, component: BlogDetail },
	{ path: routeConfig.manageBlog, component: ManageBlog },
	{ path: routeConfig.recruitment, component: Recruitment },
	{ path: routeConfig.manageRecruitment, component: ManageRecruitment },
	{ path: routeConfig.recruitmentDetail, component: RecruitmentDetail },
	{ path: routeConfig.listCandidate, component: ListCandidate },
	{ path: routeConfig.manageCourses, component: Manage },
	{ path: routeConfig.manageLessons, component: ManageLesson },
	{ path: routeConfig.personalPage, component: PersonalPage },

];

export { publicRoutes, privateRoutes }