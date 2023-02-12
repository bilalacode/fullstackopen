import axios from 'axios'
const baseUrl = '/api/blogs'

let config = {}

const setToken = (recToken) => {
  config = {
    headers: { Authorization: `Bearer ${recToken}` },
  }
}

const getAll = async () => {
  const res = await axios.get(baseUrl, config)
  return res.data
}

const postABlog = async (blog) => {

  const res = await axios.post(baseUrl, blog, config)
  console.log(res.data)
  return res.data
}

const updateLikes = async (blog) => {
  const blogId = blog.id
  const res = await axios.put(`${baseUrl}/${blogId}`, blog, config)
  console.log(res.data)
  return res.data
}

const deleteBlog = async (blogId) => {
  const result = await axios.delete(`${baseUrl}/${blogId}`, config)
  return result.data
}

export default { getAll, setToken, postABlog, updateLikes, deleteBlog }
