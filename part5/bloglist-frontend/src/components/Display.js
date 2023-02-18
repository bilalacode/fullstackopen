import Blog from './Blog'
import blogService from '../services/blogs.js'
import { useEffect } from 'react'


const Display = ({ setBlogs, blogs, user, updateLikes, deleteBlog, updateDisplay }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlog = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlog)
    })
  }, [updateDisplay])
  return (
    <>
      <h2>blogs</h2>
      <p>
        {user} logged in.
        <button type="submit" onClick={() => {
          window.localStorage.clear()
          window.location.reload()
        }}>
          logout
        </button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog}/>
      ))}
    </>
  )
}

export default Display
