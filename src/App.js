import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '~/routes/routes'
import { DefaultLayout, IntroLayout } from '~/component/Layout'
import CourseContextProvider from './actions/context/CourseContext'
import CategoryContextProvider from './actions/context/CategoryContext'
import LessonContextProvider from './actions/context/LessonContext'
import BlogContextProvider from './actions/context/BlogContext'
import RecruitmentContextProvider from './actions/context/RecruitmentContext'
import ApplicationContextProvider from './actions/context/ApplicationContext'
import UserContextProvider from './actions/context/UserContext'
import TestContextProvider from './actions/context/TestContext'

function App() {
  return (
    <UserContextProvider>
    <CategoryContextProvider>
      <RecruitmentContextProvider>
      <ApplicationContextProvider>
      <CourseContextProvider>
      <LessonContextProvider>
      <BlogContextProvider>
      <TestContextProvider>
          <Router>
            <div className="App" >
              <Routes>
                {privateRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout
                  if (route.layout){
                    Layout = route.layout === null ? Fragment : DefaultLayout
                  }
                  return (
                    <Route key={index} path={route.path} element={ <Layout> <Page /> </Layout> } />
                  )
                })}

                {publicRoutes.map((route, index) => {
                  const PageIntro = route.component;
                  let LayoutIntro = IntroLayout
                  if (route.layout){
                    LayoutIntro = route.layout === null ? Fragment : IntroLayout
                  }
                  return (
                    <Route key={index} path={route.path} element={ <LayoutIntro> <PageIntro /> </LayoutIntro> } />
                  )
                })}
              </Routes>
            </div>
          </Router>
      </TestContextProvider>
      </BlogContextProvider>
      </LessonContextProvider>
      </CourseContextProvider>
      </ApplicationContextProvider>
      </RecruitmentContextProvider>
    </CategoryContextProvider>
    </UserContextProvider>
  );
}

export default App;
