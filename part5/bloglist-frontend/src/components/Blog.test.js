import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog /> test', () => {
  let component
  let blog = {
    title: 'Test blog for jest',
    likes: 10,
    url: 'testing.com',
    author: 'Bilal Ahmed',
    user: { _id: 'ewsdrrfer234' }
  }


  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(<Blog blog={blog} updateLikes={mockHandler} deleteBlog={mockHandler}/>)
  })

  test('Renders title and author but doesn\'t render URL and title', () => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container.querySelector('.detailedView')).toHaveStyle('display: none')

  })

  test('Renders number of likes after clicking the view button', async () => {
    const user = userEvent.setup()
    const button = component.getByText('view')
    await user.click(button)
    const div = component.container.querySelector('.detailedView')
    expect(div).not.toHaveStyle('display: none')

  })

  test('Ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})

