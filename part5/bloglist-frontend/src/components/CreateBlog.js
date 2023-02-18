const CreateBlog = ({ blogNew, setBlogNew, createBlog }) => {
  return (
    <div className="formDiv">
      <h2>create</h2>
      <form onSubmit={createBlog}>
          title:{' '}
        <input
          value={blogNew.title}
          placeholder={'title'}
          onChange={({ target }) =>
            setBlogNew({ ...blogNew, title: target.value })
          }
        />
        <br></br>
          author:{' '}
        <input
          value={blogNew.author}
          placeholder={'author'}
          onChange={({ target }) =>
            setBlogNew({ ...blogNew, author: target.value })
          }
        />
        <br></br>
          url:{' '}
        <input
          value={blogNew.url}
          placeholder={'url'}
          onChange={({ target }) =>
            setBlogNew({ ...blogNew, url: target.value })
          }
        />
        <br></br>
        <button type={'submit'}>create</button>
      </form>
    </div>
  )
}

export default CreateBlog