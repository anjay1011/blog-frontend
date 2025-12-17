import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import BlogList from './components/BlogList'
import CreateBlog from './components/CreateBlog'
import Profile from './components/Profile'
import newLogo from './assets/newwlogo.png'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home') // 'home', 'profile'
  const [showCreate, setShowCreate] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Check local storage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      alert('Wrong credentials')
      // In a real app, use a Notification component
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setView('home')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setShowCreate(false)
    } catch (exception) {
      alert('Error creating blog')
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      alert('Error updating blog')
    }
  }

  const likeBlog = async (id) => {
    try {
      const returnedBlog = await blogService.like(id)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      alert('Error liking blog')
    }
  }

  const addComment = async (id, text) => {
    try {
      const returnedBlog = await blogService.addComment(id, text)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      alert('Error adding comment')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
      alert('Error deleting blog')
    }
  }

  if (user === null) {
    return (
      <LandingPage handleLogin={handleLogin} />
    )
  }

  return (
    <div>
      <NavBar
        user={user}
        handleLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        setView={setView}
      />

      <div className="container" style={{ paddingTop: '2rem' }}>
        {view === 'home' && (
          <BlogList
            blogs={blogs}
            updateBlog={updateBlog}
            likeBlog={likeBlog}
            addComment={addComment}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        )}

        {view === 'profile' && (
          <Profile
            user={user}
            blogs={blogs}
            updateBlog={updateBlog}
            likeBlog={likeBlog}
            addComment={addComment}
            deleteBlog={deleteBlog}
          />
        )}
      </div>

      {/* FAB */}
      {view === 'home' && (
        <button style={styles.fab} onClick={() => setShowCreate(true)}>
          <img src={newLogo} alt="Brew" style={{ width: '30px', height: '30px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
        </button>
      )}

      {showCreate && <CreateBlog createBlog={addBlog} onClose={() => setShowCreate(false)} user={user} />}
    </div>
  )
}

const styles = {
  fab: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    fontSize: '1.5rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 900,
    transition: 'transform 0.2s',
  }
}

export default App
