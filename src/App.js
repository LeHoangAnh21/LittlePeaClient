import { Fragment, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {
  publicRoutes,
  privateRoutes
} from '~/routes/routes'

import { DefaultLayout, IntroLayout } from '~/component/Layout'
import CourseContextProvider from './actions/context/CourseContext'
import CategoryContextProvider from './actions/context/CategoryContext'
import LessonContextProvider from './actions/context/LessonContext'
import BlogContextProvider from './actions/context/BlogContext'
import RecruitmentContextProvider from './actions/context/RecruitmentContext'
import ApplicationContextProvider from './actions/context/ApplicationContext'
import TestContextProvider from './actions/context/TestContext'
import QuestionContextProvider from './actions/context/QuestionContext'
import AnswerContextProvider from './actions/context/AnswerContext'
import UserContextProvider from './actions/context/UserContext'
import CommentContextProvider from './actions/context/CommentContext'
import SubCommentContextProvider from './actions/context/SubCommentContext'
import { AuthContext } from './actions/context/AuthContext'
import Spinner from 'react-bootstrap/Spinner'

function App() {

  const {
    authState: { authLoading, isAuthenticated, user }
  } = useContext(AuthContext)

  if (authLoading)
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  
  let PageIntro = null
  let LayoutIntro = null
  let Path = null

  publicRoutes.map((route) => {
      PageIntro = route.component;
      LayoutIntro = IntroLayout
      Path = route.path
      if (route.layout) {
        LayoutIntro = route.layout === null ? Fragment : IntroLayout
      }
  })

  return (
    <UserContextProvider>
    <CategoryContextProvider>
      <RecruitmentContextProvider>
      <ApplicationContextProvider>
      <CourseContextProvider>
      <LessonContextProvider>
      <BlogContextProvider>
      <CommentContextProvider>
      <SubCommentContextProvider>
      <AnswerContextProvider>
      <TestContextProvider>
      <QuestionContextProvider>
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
                  <Route key={index} path={route.path} element={isAuthenticated ? < Layout > <Page /> </Layout> : <LayoutIntro> <PageIntro /> </LayoutIntro>} />
                )
              })}

              <Route path={Path} element={<LayoutIntro> <PageIntro /> </LayoutIntro>} />

            </Routes>
          </div>
        </Router>
      </QuestionContextProvider>
      </TestContextProvider>
      </AnswerContextProvider>
      </SubCommentContextProvider>
      </CommentContextProvider>
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
