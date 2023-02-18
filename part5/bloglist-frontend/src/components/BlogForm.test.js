import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogFrom from './BlogForm'


describe('Creates a new blog', () => {
  test('calls the createBlog event handler with the right details when a new blog is created', async () => {


    const addBlogs = jest.fn()
    const user = userEvent.setup()
    const component = render(<BlogFrom addBlogs={addBlogs} />)

    const title = component.getByPlaceholderText('title')
    const author = component.getByPlaceholderText('author')
    const url = component.getByPlaceholderText('url')
    const button = component.getByRole('button', { type: 'submit' })

    await user.type(title, 'title testing')
    await user.type(author, 'author testing')
    await user.type(url, 'urltesting.com')
    await user.click(button)

    expect(addBlogs.mock.calls).toHaveLength(1)
    expect(addBlogs.mock.calls[0][0].title).toBe('title testing')
    expect(addBlogs.mock.calls[0][0].url).toBe('urltesting.com')
    expect(addBlogs.mock.calls[0][0].author).toBe('author testing')





  })
})