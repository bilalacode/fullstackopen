import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {

  const [visible, setVisible] = useState(false)


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisibile = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="simpleView">
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisibile} className="detailedView">
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          likes <div className='numberoflikes'>{blog.likes}</div> <button onClick={() => updateLikes(blog.id, blog.likes)}>like</button>
          <br></br>
          {blog.author}
          <br></br>
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}



export default Blog