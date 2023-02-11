const CreateBlog = ({ blogNew, setBlogNew, createBlog }) => {
    return (
      <>
        <h2>create</h2>
        <form onSubmit={createBlog}>
          title:{" "}
          <input
            value={blogNew.title}
            onChange={({ target }) =>
              setBlogNew({ ...blogNew, title: target.value })
            }
          />
          <br></br>
          author:{" "}
          <input
            value={blogNew.author}
            onChange={({ target }) =>
              setBlogNew({ ...blogNew, author: target.value })
            }
          />
          <br></br>
          url:{" "}
          <input
            value={blogNew.url}
            onChange={({ target }) =>
              setBlogNew({ ...blogNew, url: target.value })
            }
          />
          <br></br>
          <button type={"submit"}>create</button>
        </form>
      </>
    );
  };

export default CreateBlog