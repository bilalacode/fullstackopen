import { useState } from 'react'
// import blogService from '../services/blogs'


const Blog = ({ blog, updateLikes, deleteBlog }) => {

  const [visible, setVisible] = useState(false)
  // const [likes, setLikes] = useState(blog.likes)


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisibile = { display: visible ? '': 'none' }

  const toggleVisibility = () => setVisible(!visible)

  // const deleteBlog = async () => {
  //   if(window.confirm()){
  //     await blogService.deleteBlog(blog.id)
  //     window.location.reload()

  //   }
  // }

  // const updateLikes = async () => {

  //   const newBlog = {
  //     user: blog.user._id,
  //     likes: likes + 1,
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url,
  //     id: blog.id
  //   }
  //   const result = await blogService.updateLikes(newBlog)
  //   setLikes(result.likes)

  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
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

// const Blog = ({ blog }) => (
//   <ExpandView blog ={blog} />
// )

export default Blog