import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/blogs/:id">
            {user ? <BlogDetails blogs={blogs} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/blogs">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/users/:id">
            {user ? <User users={users} /> : <LoginForm />}
          </Route>
          <Route path="/users">
            {user ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <LoginForm />}
          </Route>
          <Route path="/">
            {user ? <Redirect to="/blogs" /> : <LoginForm />}
          </Route>
        </Switch>
      </Router>

    </div >
  )
}

export default App