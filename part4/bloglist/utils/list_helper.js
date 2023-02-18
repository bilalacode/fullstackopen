let _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLike = (blogs) => {
  if (blogs.length === 0) return 0
  const sum = (first, second) => first + second
  return blogs.map((blog) => blog.likes).reduce(sum)
}

const favoriteBlog = (blogs) => {
  let currentMaxblog = {}
  let currentMaxLikes = 0

  blogs.forEach((blog) => {
    if (blog.likes > currentMaxLikes) {
      currentMaxLikes = blog.likes
      currentMaxblog = blog
    }
  })

  return currentMaxblog
}

const mostAuthored = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, 'author')
  const mostBloggedAuthor = _.maxBy(Object.values(groupByAuthor), (blog) => {
    // console.log(blog)
    return blog.length
  })

  const result = {
    author: mostBloggedAuthor[0].author,
    blogs: mostBloggedAuthor.length,
  }

  return result
}

const mostLiked = (blogs) => {
  let currentMaxblog = {}
  let currentMaxLikes = 0

  blogs.forEach((blog) => {
    if (blog.likes > currentMaxLikes) {
      currentMaxLikes = blog.likes
      currentMaxblog = blog
    }
  })


  const totalLikes = (mostLikedBlog) => {
    let likes = 0

    blogs.forEach((blog) => {
      if (blog.author === mostLikedBlog.author) {
        likes += blog.likes
      }
    })

    return { author: mostLikedBlog.author, likes: likes }
  }

  return totalLikes(currentMaxblog)
}

module.exports = {
  dummy,
  totalLike,
  favoriteBlog,
  mostAuthored,
  mostLiked,
}
